#!/usr/bin/env python3

"""
@file: config.py
@brief: 项目配置文件
@author: feihu1996.cn
@date: 18-08-26
@version: 1.0
"""

# 开发服务器配置
WEB_HOST="0.0.0.0"
WEB_PORT=8080

# url前缀
URL_PREFIX=""
# URL_PREFIX="/randomKey"

# 静态资源
STATIC_FOLDER="static"
STATIC_URL=URL_PREFIX + "/static"

