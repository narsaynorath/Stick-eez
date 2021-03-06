"""user table and add note foreign key

Revision ID: 03be15e07ee7
Revises: 9c166a235730
Create Date: 2020-05-22 18:07:47.964872

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '03be15e07ee7'
down_revision = '9c166a235730'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.add_column('note', sa.Column('author', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'note', 'user', ['author'], ['id'])
    op.drop_column('note', 'user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('note', sa.Column('user', sa.VARCHAR(length=60), server_default=sa.text("'Anonymous'::character varying"), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'note', type_='foreignkey')
    op.drop_column('note', 'author')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###
