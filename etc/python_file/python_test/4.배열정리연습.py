import pymysql #sql연동하기 위하여사용
import cv2 #opencv를 사용하기 위하여 사용
import pyzbar.pyzbar as pyzbar #QR코드를 인식하기위한 라이브러리 사용

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml') #사람 얼굴인식기

data_list = [] #QR코드 값을 받기위한 배열
buy_codes =[]
A = (['abc','a_10'])
B = ['B1','B2']
QRBUY=[]
try:
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
#==============
cap =cv2.VideoCapture(0)

for i in data_list:
    buy_codes.append(i.rsplit('\n'))#대문자제거

if cap.isOpened():
    print("너비",cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    print("높이",cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print("FPS",cap.get(cv2.CAP_PROP_FPS))

while cap.isOpened():  # 웹캠을 계속 돌리기위한 while문
    ret, img = cap.read()
    fps = 30

    if ret:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        for code in pyzbar.decode(img):  # QR코드 인식,사진저장 하기위한 반복문
            my_code = code.data.decode('utf8')
            if my_code not in buy_codes:  # 중복 됐을 경우를 방지하기위한 조건문
                buy_codes.append(my_code)
                QRBUY.append(my_code)
                for i in range(0, 2):
                    if (buy_codes[i] == A[i]):
                        print("인식완료 : ",buy_codes[i])
                        if (my_code == str(buy_codes[i])):  # 영상으로 인식한 code가 str값 abc가 맞다면 조건문 진행
                            cv2.imwrite('QRCODE.png', img)  # abc의 QR코드 사진 저장
                            curs.execute(sql, (buy_codes[i]))  # sql불러오기
                            conn.commit()  # 커밋하기
                            sql2 = "select * from topic "  # 테이블 선택하기
                            curs.execute(sql2)  # sql불러오기
                            rows = curs.fetchall()  # 모든 데이터 넣기
                            print(rows)  # 제대로 저장되었는지 출력하기
                f2 = open("QRCODE_DATA.txt", "a", encoding="utf8")#txt파일 별도 저장을 위한 txt에 인식코드 저장하기
                f2 = open("QRCODE_DATA.xlsx", "a", encoding="utf8")#엑셀파일 별도 저장을 위한 txt에 인식코드 저장하기
                f2.write(my_code + '\n')
                f2.close()
            else:  # 이미 인식된 QR경우의 경우의 알람
                print("이미 인식된 QRCODE 입니다. txt파일로 QRCODE번호가 저장되어있습니다  ")
        for (x, y, w, h) in faces:  # 사람의 얼굴을 인식했을때 사각형으로 띄워주는 반복문
            img = cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            print('전방에 사람이 있습니다 아두이노 스탑제어부분')

        cv2.imshow('video', img)
        key = cv2.waitKey(1)
        if key == 27:
            break

cv2.release()
cv2.destroyAllWindows()
