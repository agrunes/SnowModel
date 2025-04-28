 'reinit'
 'set display color white'
 'c'

 'open ../../ctl_files/wo_assim/snod.ctl'

 'set grads off'
 'set parea 1.25 10.25 1.25 7.4'

 'set xlopts 1 5 0.16'
 'set ylopts 1 5 0.16'
 'set ylint 10'

*'set t 1 365'
 'set time 01OCT2015 01JUN2016'
 'set x 180'
 'set y 150'

 'set vrange 0 250'
 'set cmark 0'
 'd 100*snod'

 'draw ylab Snow Depth (cm)'
 'draw title Snow Depth (cm), at grid cell i=120, j=194 (~SUMM)'

 'gprint snow2'

