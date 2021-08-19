<?php
 $uploadedfile = './uploads/'.$_FILES['upload'] ['name'];
 if(move_uploaded_file($_FILES['upload']['tmp_name'],$uploadedfile)){
  echo "파일이 업로드 완료<br />";
  echo "파일이름 : {$_FILES['upload']['name']}<br />";
  echo "파일 크기 : {$_FILES['upload']['size']} byte <br />";
  echo "임시파일 이름 : {$_FILES['upload']['size']}<br />";
 } else {
  echo "파일 업로드 실패<br />";
 }
?>