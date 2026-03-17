from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
import asyncio
from sqlalchemy import text
from .config import settings

# Normalise URL — accept both postgresql:// and postgresql+asyncpg://
_db_url = settings.DATABASE_URL
if _db_url.startswith("postgresql://"):
    _db_url = _db_url.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(
    _db_url,
    echo=False,          # set True for SQL debug logging
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,  # detect stale connections
)

AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

from models import entities  # noqa: F401,E402

async def init_db():
    """Initialize database tables — warn-only if DB is unavailable."""
    import logging
    _logger = logging.getLogger(__name__)
    for attempt in range(3):
        try:
            async with engine.begin() as conn:
                await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
                await conn.run_sync(Base.metadata.create_all)
            _logger.info("Database initialised successfully.")
            return
        except Exception as exc:
            _logger.warning("DB init attempt %d failed: %s", attempt + 1, exc)
            await asyncio.sleep(2)

    _logger.warning("Database unavailable — running without persistence.")

async def get_db():
    """Dependency to get database session"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()