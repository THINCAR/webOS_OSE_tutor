#!/usr/bin/python
# -*- coding:utf-8 -*-

import requests
import pyaudio
import wave

chunk = 1024  # Record in chunks of 1024 samples
sample_format = pyaudio.paInt16  # 16 bits per sample
channels = 1
fs = 44100  # Record at 44100 samples per second
# seconds = 3
# filename = "result.wav"
file_num = 0
name_num = 0
# 녹음 여부    0:녹음중지, 1:녹음시작
state = 0

while True:
    # state_value
    try:
        f = open("state.txt", 'r')
        data = f.read()
        state = int(data)
        f.close()
    except ValueError:
        pass
    if state == 1:
        name = input("본인의 이름을 적어주십시오 : ")
        print("녹음 시작")
        p = pyaudio.PyAudio()  # Create an interface to PortAudio
        filename = "result" + str(file_num) + ".wav"
        stream = p.open(format=sample_format,
                        channels=channels,
                        rate=fs,
                        frames_per_buffer=chunk,
                        input=True)
        frames = []  # Initialize array to store frames
        while True:
            # state_value
            f = open("state.txt", 'r')
            data = f.read()
            state = int(data)
            f.close()
            if state == 0:
                # Stop and close the stream
                stream.stop_stream()
                stream.close()
                # Terminate the PortAudio interface
                p.terminate()
                print("녹음 종료")
                break
            data = stream.read(chunk)
            frames.append(data)

        # Save the recorded data as a WAV file
        wf = wave.open(filename, 'wb')
        wf.setnchannels(channels)
        wf.setsampwidth(p.get_sample_size(sample_format))
        wf.setframerate(fs)
        wf.writeframes(b''.join(frames))
        wf.close()

        name_file = "name" + str(name_num) + ".txt"
        with open(name_file, 'w') as f:
            f.write(name)

        try:
            url = 'http://localhost:3000/webOS_audio/upload.php'
            files = {'upload': open(filename, 'rb')}
            r = requests.post(url, files=files)
            files = {'upload': open(name_file, 'rb')}
            r = requests.post(url, files=files)
            print("전송 성공")
            file_num += 1
            name_num += 1
        except:
            print("전송 실패")
