Author: Anna Grunes
SnowModel information
Updated: April 23rd, 2025

For more in-depth information on running SnowModel, see G. Liston's documentation
	in the original version at the following source:

Liston, G. E. (2020). SnowModel (version 2020_10_02). 
   Retrieved from ftp://gliston.cira.colostate.edu/SnowModel/code/snowmodel_2020_10_02.zip


Permissions: 
All of the SnowModel should have these permissions: 
	-rwxr-xr-x 
Use "chmod -R u=rwx,g=rx,o=rx" to change permission for all (recursively)
----------------------------
To run any .f files, use 'gfortran ****.f' then './a.out'
----------------------------
To create a new model run, edit and run ./copy_to_new_application.script
----------------------------
To compile code, run >>./compile_snowmodel.script in code directory. This creates
	an executable 'snowmodel' in the base directory. 
----------------------------
snowmodel.par file
 - make sure max_iter is length of met input file 
 - make sure domain parameters match SM_dxdy_cornerll_proj_OUTPUTS.dat
 - To adjust model output frequency (i.e. daily output, 3-hrly output, regardless of
	model timestep) adjust print_inc parameter
	(i.e. print_inc=8 when model is run on 3-hrly timestep but daily output is desired)
----------------------------
Running SnowModel
 - run >> ./snowmodel > ./output.dat & (to direct output into ./output.dat file and surpress output)
 - check ./output.dat file for status of model run and error messages
 - >>jobs to see the status of the model run
----------------------------
