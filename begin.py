#!/usr/bin/env python3

"""
@file: begin.py
@brief: 启动WebA App
@author: feihu1996.cn
@date: 18-08-26
@version: 1.0
"""

import os

work_dir = os.getcwd()

print("启动web app...")
gun_file = open("gun.conf", "rb")
temps = []
for line in gun_file.readlines():
    if "chdir" not in line.decode("utf8"):
        temps.append(line)
gun_file.close()
gun_file = open("gun.conf", "wb")
gun_file.writelines(temps)
gun_file.close()
os.system(r"""
echo chdir = \'{work_dir}\' >> gun.conf
""".format(work_dir=work_dir))
os.system(r"""
gunicorn -k gevent -c gun.conf random_key:app
""")

