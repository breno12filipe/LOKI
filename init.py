import platform
import threading
import logging
import os


so = platform.system()

def start_express_server():
    os.system('npm start')
    

def start_electron_instance():
    if so == 'Linux':
        os.system('cd ../engine && npm start')
    elif so == 'Windows':
        os.system('cd ..\engine && npm start')

try:
    server_thread = threading.Thread(target=start_express_server)
    server_thread.start()

    electron_thread = threading.Thread(target=start_electron_instance)
    electron_thread.start()
except:
    print("ERROR: unable to start thread")



