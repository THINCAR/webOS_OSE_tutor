
call ares-install -r com.domain.tutorial
call ares-package webapp service -o ./dist
call ares-install ./dist/com.domain.tutorial_1.0.0_all.ipk
call ares-inspect com.domain.tutorial -o

^Z