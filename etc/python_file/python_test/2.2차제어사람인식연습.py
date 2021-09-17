import pymysql #sql연동하기 위하여사용
import cv2 #opencv를 사용하기 위하여 사용
import pyzbar.pyzbar as pyzbar #QR코드를 인식하기위한 라이브러리 사용
import serial #아두이누 연동을 위해 사용
import time # 시간 계산

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml') #사람 얼굴인식기가져오기
arduino = serial.Serial('COM5',9600) # com5번 포트로 serial연결
time.sleep(1) #시간 설정
data_list = [] #QR코드 값을 받기위한 배열
buy_codes =[] # 대문자 제거하기 위한 배열

try: # txt파일에 업데이트하기 위해 사용
    f =open("QRCODE_DATA.txt","r",encoding="utf8")
    data_list = f.readlines()
except FileExistsError:
    pass
else:
    f.close()
# SQL 연결을위한 설정
#============== sql문
conn = pymysql.connect(host="localhost",user="root",password="970912",db="workbench",charset="utf8") #기본적인연결단계

curs = conn.cursor() # connect 을 하기위함
sql = """insert into topic(title,created) 
          values (%s,now())""" # mySQL table에 저장하고싶은 값을지정
#===============
cap =cv2.VideoCapture(0) # 캠 실행을 위한 cap변수

for i in data_list:
    buy_codes.append(i.rsplit('\n'))#대문자제거

if cap.isOpened(): #캠영상의 너비 높이 FPS값 실시간 출력
    print("너비",cap.get(cv2.CAP_PROP_FRAME_WIDTH)) #너비값출력
    print("높이",cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) #높이값출력
    print("FPS",cap.get(cv2.CAP_PROP_FPS)) #FPS값 출력

while cap.isOpened():  # 웹캠을 계속 돌리기위해 while사용
    ret, img = cap.read() # ret, img 값 읽어오기

    if ret:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) # 영상처리를 위해 gray값을 받아오기 위해여 img 값을  cv2를 이용하여
        # BGR2GRAY값으로 처리
        faces = face_cascade.detectMultiScale(gray, 1.3, 5) # 얼굴인식을 위하여 얼굴인식 라이브러리 face_cascade
        for code in pyzbar.decode(img):  # QR코드 인식,사진저장 하기위한 반복문
            my_code = code.data.decode('utf8') #QR코드 값을 파이썬에서 인코딩 할수있게 utf-8값으로 변경한다.
            if my_code not in buy_codes:  # 구매목록배열에 인식한QRCODE가 있는지 없을경우 실행
                print("인식성공  : ", my_code) # 없을경우 인식성공 메세지출력
                buy_codes.append(my_code) #인식한 QRCODE 목록을 buy_codes배열로 보낸다.
                #아두이누 제어 환경
                if (my_code == str('abc')): # 영상으로 인식한 code가 str값 abc가 맞다면 조건문 진행
                    var = '1'
                    if (var == str('1')):
                        var = var.encode('utf-8')
                        arduino.write(var)
                        print("ON")
                        time.sleep(1)

                    cv2.imwrite('QRCODE_abc.png', img)  # abc의 QR코드 사진 저장
                    curs.execute(sql, ('abc')) #sql불러오기
                    conn.commit() # 커밋하기
                    sql2 = "select * from topic " #테이블 선택하기
                    curs.execute(sql2) # sql불러오기
                    rows = curs.fetchall() #모든 데이터 넣기
                    print(rows) # 제대로 저장되었는지 출력하기
                    var = '0'
                    if (var == '0'):
                        var = var.encode('utf-8')
                        arduino.write(var)
                        print("LED turned ON")
                        time.sleep(1)
                if (my_code == str('a_10')): #위과정과 동문
                    var = '1'
                    if (var == str('1')):
                        var = var.encode('utf-8')
                        arduino.write(var)
                        print("ON")
                        time.sleep(1)
                    cv2.imwrite('QRCODE_a_10.png', img)
                    curs.execute(sql, ('a_10'))
                    conn.commit()
                    sql2 = "select * from topic "
                    curs.execute(sql2)
                    rows = curs.fetchall()
                    print(rows)
                    var = '0'
                    if (var == '0'):
                        var = var.encode('utf-8')
                        arduino.write(var)
                        print("LED turned ON")
                        time.sleep(1)
                f2 = open("QRCODE_DATA.txt", "a", encoding="utf8")#txt파일 별도 저장을 위한 txt에 인식코드 저장하기
                f2 = open("QRCODE_DATA.xlsx", "a", encoding="utf8")#엑셀파일 별도 저장을 위한 txt에 인식코드 저장하기
                f2.write(my_code + '\n')
                f2.close()
            else:  # 이미 인식된 QR경우의 경우의 알람
                print("이미 인식된 QRCODE 입니다. txt파일로 QRCODE번호가 저장되어있습니다  ")
        for (x, y, w, h) in faces:  # 사람의 얼굴을 인식했을때 사각형으로 띄워주는 반복문
            img = cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            print('전방에 사람이 있습니다 아두이노 스탑제어시작 빨간불10초간켜기')
            var = '2' # 아두이노전달값과 같게하기위한 var변수 사용
            if (var == str('2')):
                var = var.encode('utf-8')
                arduino.write(var)
                print("ON")
                time.sleep(1)
            var = '0' # 불을 끄게 하긴위한 var변수 0으로 지정
            if (var == '0'):
                var = var.encode('utf-8')
                arduino.write(var)
                print("LED turned ON")
                time.sleep(1)

        cv2.imshow('video', img)
        key = cv2.waitKey(1) # key 캠 상황을 제어하기 위한  waitkey설정단계
        if key == 27: # key 가 27일때 => ESC키를 눌렀을때 와 같다
            break # ESC가 눌러졌을때 영상을 종료한다.

cv2.release()
cv2.destroyAllWindows()