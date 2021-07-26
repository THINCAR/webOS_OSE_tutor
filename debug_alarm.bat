
call ares-install -r com.domain.alarm
call ares-package app_alarm -o ./dist
call ares-install ./dist/com.domain.alarm_1.0.0_all.ipk
call ares-inspect com.domain.alarm -o

^Z