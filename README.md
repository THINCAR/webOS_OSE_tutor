# webOS_OSE_tutor #

> ### Do anything about webOS_OSE ###
>### :star:thank you for watching:star: ###

# 구조 #

> - __webapp__
>     - __appinfo.json__
>     - icon.png
>     - index.html
>     - index.css
>     - index.js
> - __service__
>     - helloclient.js
>     - helloworld_webos_service.js
>     - package.json
>     - services.json
> - .gitignore
> - debug.bat

# webapp #

<details>
<summary><b>detail</b></summary>
  </br>
  
  > ## 웹 어플리케이션 디렉토리 입니다. ##
  > - HTML은 어플리케이션의 객체들을 선언하고 css, js 파일을 연결합니다.
  > - CSS는 어플리케이션 객체들의 스타일을 정의합니다.
  > - JS에서는 이벤트를 처리하고, LS2 API 메서드를 실행 및 처리합니다.
  > - appinfo.json 파일에는 어플리케이션의 메타 데이터가 들어가 있습니다.
  > - appinfo.json 파일에는 프로젝트에 사용되는 LS2 API 서비스 리스트도 들어가 있습니다.
  > - icon.png 파일은 어플리케이션의 아이콘입니다.
</details>

# Service #

<details>
<summary><b>detail</b></summary>
  </br>

  > ## 서비스 디렉토리 입니다. ##
  > - package.json 파일에는 패키지의 메타 데이터가 들어 있습니다.
  > - services.json 파일에는 서비스 ID와 서비스 이름 등이 들어 있습니다.
  > - helloClient.js
  > - helloworld_webos_service.js
</details>

# .gitignore

<details>
<summary><b>detail</b></summary>
</br>

  > ## Git 저장소에서 무시할 파일 및 폴더를 설정합니다. ##
  > - 내부에 파일명, 디렉터리 명을 '\n'으로 구분하여 적습니다.
  > - 적힌 파일은 git 사용시 무시되며, add, commit 등의 명령어가 먹히지 않습니다.
  > - 현재 ./dist 디렉터리가 무시되고 있습니다.
  > - ./dist 디렉터리는 패키지 파일이 들어가는 디렉터리 입니다.
</details>

# debug.bat

<details>
<summary><b>detail</b></summary>
</br>

  > ## 디버깅 용도의 배치 파일입니다. ##
  > - Windows10 환경에서 실행 가능합니다.
  > - 실행전에 default 기기가 현재 사용하는 기기로 설정되어 있는지 확인하세요.
  > - 기존 앱을 삭제, 앱 패키지, 앱 설치, 앱 디버거 실행을 자동으로 수행합니다. 
</details>

# UI
- UI 관련해서 프로젝트를 만들고
- 무엇이든 시도해보기!