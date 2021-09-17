import pymysql
import cv2
import pyzbar.pyzbar as pyzbar
import time
import serial


face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml') #opecv 안면인식AI 사용
arduino = serial.Serial('/dev/ttyUSB0',9600) # com5번 포트로 serial연결
py_qrcode =[]

conn = pymysql.connect(host='127.0.0.1', user='root', password='root', db='project', charset='utf8')
curs = conn.cursor()
curs2 = conn.cursor()
curs3 = conn.cursor()
curs4 = conn.cursor()

#아두이노-라즈베리파이 시리얼 통신 (자동차 바퀴 제어)
def arduino_go(mycode):
    if (my_code == str('abc')):  #  앞으로가게하기 위한 제어
        var = '1'
        if (var == str('1')):
            var = var.encode('utf-8')
            arduino.write(var)
            print("go!")

def arduino_P(var):
    var = '1'
    if (var == str('1')):
        var = var.encode('utf-8')
        arduino.write(var)

def arduino_stop(var):
    var ='2'
    if (var == str('2')):
        var = var.encode('utf-8')
        arduino.write(var)
        print("stop!")

def arduino_back(var):
    var ='3'
    if (var == str('3')):
        var = var.encode('utf-8')
        arduino.write(var)
        print("back!")
        time.sleep(2)
        var ='2'
        if (var == str('2')):
            var = var.encode('utf-8')
            arduino.write(var)
            print("종료")

def arduino_fn(mycode):
    var ='a_10'
    if (var == str('a_10')):
        var = var.encode('utf-8')
        arduino.write(var)
        print("stop!")

#DB데이터 update ???????????????
def table_b1(rs):
    for row20 in rs:
        if (row20[1] == my_code):
            sql20 = "UPDATE outproduct SET count=%s WHERE qr_code=%s"
            curs2.execute(sql20, (row20[2] - 1, my_code))
            conn.commit()
            break
        else:
            var = '1'
            if (var == str('1')):
                var = var.encode('utf-8')
                arduino.write(var)

#??????????????????
def table_b2(rows2):
    for row1 in rows2:

        if (row1[2] == my_code):
            sql3 = "UPDATE qrcode_database SET product=%s WHERE qr_code=%s"
            curs2.execute(sql3, (row1[6] + 1, my_code))
            conn.commit()
            break
        else:
            var = '1'
            if (var == str('1')):
                var = var.encode('utf-8')
                arduino.write(var)

#???????????????????????????
def table_b4(rows4):
    for row4 in rows4:
        if (row4[2] == my_code):
            sql10 = "UPDATE qrcode_database SET stock=%s WHERE qr_code=%s"
            curs2.execute(sql10, (row4[5] -1 , my_code))
            conn.commit()
            break
        else:
            var = '1'
            if (var == str('1')):
                var = var.encode('utf-8')
                arduino.write(var)

def talbe_b3(rs3):
    for row2 in rs3:

        if (row2[1] == my_code):
            sql4 = "Delete from outproduct WHERE qr_code = %s"
            curs3.execute(sql4, my_code)
            conn.commit()
            arduino_back(3)
        elif (row2[1] !=my_code):
            arduino_P(1)

#OpenCV 카메라세팅
video = cv2.VideoCapture(-1);
video.set(cv2.CAP_PROP_FPS, int(60))
me_code =" "


#메인소스
if __name__ == '__main__':
    print("Frame rate : {0}".format(video.get(cv2.CAP_PROP_FPS)))
    while video.isOpened():
        ret, img = video.read()
        if ret:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            for code in pyzbar.decode(img):
                my_code = code.data.decode('utf8')
                stright = arduino_go(my_code)

                if my_code not in py_qrcode:
                    py_qrcode.append(my_code)

                    print("인식완료 : ", my_code)
                    time.sleep(4)
                    #arduino_stop(2)

                    sql = "select * from outproduct "
                    curs.execute(sql)
                    rs = curs.fetchall()
                    tb1 = table_b1(rs)

                    sql10 = "select * from qrcode_database "
                    curs2.execute(sql10)
                    rows2 = curs2.fetchall()
                    tb2 = table_b2(rows2)

                    sql11 = "select * from qrcode_database "
                    curs4.execute(sql11)
                    rows4 = curs4.fetchall()
                    tb4 = table_b4(rows4)

                    sql4 = "select * from outproduct "
                    curs3.execute(sql4)
                    rs3 = curs3.fetchall()
                    tb3 = talbe_b3(rs3)

                else:
                    print("이미 인식된 QRCODE 입니다")

            for (x, y, w, h) in faces:
                img = cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
                print('전방에 사람이 있습니다')
                arduino_stop(2)
                time.sleep(4)
                arduino_P(1)

            ret1, frame2 = video.read()
            cv2.imshow("Changed", frame2)
            if cv2.waitKey(10) & 0xFF == ord('q'):  # press q to quit
                break

video.release()
cv2.destroyAllWindows()
