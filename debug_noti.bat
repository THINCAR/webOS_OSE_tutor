
call ares-install -r com.domain.noti
call ares-package app_noti -o ./dist
call ares-install ./dist/com.domain.noti_1.0.0_all.ipk
call ares-inspect com.domain.noti -o

^Z