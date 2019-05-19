"""empty message

Revision ID: 29a88310c40b
Revises: 99c538dd8e78
Create Date: 2019-05-19 15:51:10.045455

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29a88310c40b'
down_revision = '99c538dd8e78'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('token', sa.String(length=32), nullable=True))
    op.add_column('user', sa.Column('token_expiration', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_user_token'), 'user', ['token'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_token'), table_name='user')
    op.drop_column('user', 'token_expiration')
    op.drop_column('user', 'token')
    # ### end Alembic commands ###
