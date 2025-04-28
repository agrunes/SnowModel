 'reinit'
 'set display color white'
 'c'

 'open ../../ctl_files/wo_assim/snod.ctl'
 'open ../../topo_vege/NoAm_30m/topo_vege.ctl'

 'set grads off'
 'set mproj scaled'
 'set mpdraw off'
 'set parea 1.0 10.0 1.5 7.65'

 'set xlopts 1 5 0.16'
 'set ylopts 1 5 0.16'
 'set xlab %g'
 'set ylab %g'
 'set xlint 5'
 'set ylint 5'

 'set gxout shaded'
 'set time 03z10mar2016'
 'd 100*snod'
 'cbarn 1 0 5.5 0.8'

 'set gxout contour'
 'd topo.2(t=1)'

 'draw title Snow Depth (cm), March 10th 2016 03:00 \(black contours = topo)'

 'gprint snow1'

