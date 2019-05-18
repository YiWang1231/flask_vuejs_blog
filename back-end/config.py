import os
from dotenv import load_dotenv # dotenv读取环境变量信息

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


def Config(object):
    pass