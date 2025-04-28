# SnowModel development: Improved model framework for modeling snow in the Northeastern U.S.A.

<!-- ![combined](https://user-images.githubusercontent.com/20308427/92159459-4a1c9380-ede2-11ea-8a07-99015fa9e4a9.jpg) -->

##### Anna Grunes<sup>1</sup>, Graham Sexstone<sup>2</sup>

###### <sup>1</sup> Civil and Environmental Engineering Department, University of Vermont

###### <sup>2</sup> U.S. Geological Survey Colorado Water Science Center

##### This repository contains further developments to the SnowModel distributed model framework [(Liston and Elder, 2006; ](https://journals.ametsoc.org/view/journals/hydr/7/6/jhm548_1.xml) [Pflug et al., 2019))](https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1029/2018WR024632@10.1002/(ISSN)1944-7973.SNOWEX1). Here, the gravity drainage model developed by [Pflug et al. (2019)](https://github.com/jupflug/SnowModel/tree/master) is adjusted to include a calculation of the rain-snow threshold as a function of both T<sub>air</sub> and RH, as well as the $\rho$-adjust parameter to adjust the densification rate of the snowpack, with the goal of improving model performance in warm, wet snow environments. 


### Model developments from Pflug et al. 2019 version:
All adjustments to code are denoted by "Grunes/Sexstone additions" in the model code.
* Inclusion of $\rho$-adjust parameter (`ro_adjust`) in [snowmodel.par](relative_link) to adjust densification rate
* Four options for snowfall fraction (`snowfall_frac`) calculation in [snowmodel.par](relative_link): 
    1. Single-value threshold, air-temperature only (Auer, 1974)
    2. Hyperbolic tangent function to represent the snowfall fraction as a function of only air temperature (T<sub>air</sub>) (Dai, 2008; [(Liston and Elder, 2006](https://journals.ametsoc.org/view/journals/hydr/7/6/jhm548_1.xml))
    3. Bivariate logistic regression model, which calculates the probability of snow occurring (*p(snow)*) as a function of air temperature (T<sub>air</sub>) and RH, [(Jennings et al., 2018)](https://www.nature.com/articles/s41467-018-03629-7). 
    4. Wet bulb temperature threshold, which calculates T<sub>wetbulb</sub> as a function of T<sub>air</sub> and RH

* Implementation of air temperature (`pertTair`) and precipitation (`pertPrec`) perturbation parameters in [snowmodel.par](relative_link)


## Details
#### `ro_adjust` parameter
`ro_adjust` is a snow density rate adjustment factor that can be used to make the snow density increase faster (ro_adjust > 1.0) or slower (ro_adjust < 1.0).

[(Liston and Elder, 2006](https://journals.ametsoc.org/view/journals/hydr/7/6/jhm548_1.xml) has `ro_adjust` hard-coded into the SnowPack sub-model (in [code/snowpack_code.f](relative_link)). This version includes the adjustment of `ro_adjust` in the [snowmodel.par](relative_link) file so this is easily adjustable for model runs. 

#### `snowfall_frac` parameter
[Liston and Elder, 2006](https://journals.ametsoc.org/view/journals/hydr/7/6/jhm548_1.xml) original model version has a `snowfall_frac` parameter included in the [snowmodel.par](relative_link) file to adjust the method used to partition precipitation. In this model version, this parameter is now included in the [snowmodel.par](relative_link) file with different options for precipitation phase partitioning methods. 

1. **`snowfall_frac` = 1.0: Single-value threshold, air-temperature only [(Auer, 1974)](https://www.tandfonline.com/doi/abs/10.1080/00431672.1974.9931684)**
Rain occurs at temperatures above **+2&deg;C** and snow occurs below this threshold. No mixed precipitation occurs. 
    *The value of this threshold may be adjusted in the [code/micromet_code.f](relative_link) file. 
2. **`snowfall_frac` = 2.0: Hyperbolic tangent function, air-temperature only [(Dai, 2008)](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2008GL033295)**
Rain vs. snow is determined based on a hyperbolic tangent function to represent the snowfall fraction (F) as a function of only air temperature (T<sub>air</sub>) as shown in the following equation. Here, mixed precipitation may occur at near-freezing temperatures. 

$F[T_air] = a[tanh(b(T_air-c))-d]$ 

*where a, b, c, and d were set to −0.482292, 0.7205, 1.1662, and 1.0223, respectively.*

3. **`snowfall_frac` = 3.0: T<sub>air</sub>-RH bivariate logistic regression model [(Jennings et al., 2018)](https://www.nature.com/articles/s41467-018-03629-7)**
Rain vs. snow is determined based on the calculated probability of snow occurring. The following equation calculates the probability of snow occurring (*p(snow)*) as a function of air temperature (T<sub>air</sub>) and RH. Precipitation is classified as snow when the probability of snow occurring is greater than or equal to 50%, and classified as rain when less than 50%. 


###### **Adjustments were made to SnowModel MicroMet code to include RH in the calculation of the rain-snow partitioning.*

$p(snow) = {1\over1+e^(\alpha+\beta T_air+\gamma RH)}$

*where α, β, and γ were set to -10.04, 1.41, and 0.09, respectively.*


4. **`snowfall_frac` = 4.0: Wet bulb temperature threshold**
Wet bulb temperature is calculated as a function of T<sub>air</sub> and RH using an empirical equation (Stull, 2011). Rain occurs at wet bulb temperatures above **+0.5&deg;C** and snow occurs below this threshold. No mixed precipitation occurs. 
    *The value of this threshold may be adjusted in the [code/micromet_code.f](relative_link) file. 

#### `pertTair` and `pertPrec` parameters
These parameters were implemented to conduct climate scenario analyses with temperature and preciptiation perturbations. 
* `pertTair` : if `pertTair` = 0, no perturbation will be applied. Otherwise, value will be used as a **scalar addition** to the entire met input T<sub>air</sub> time series. Temperature adjustment should be in degrees units &deg;C. 
* `pertPrec` : if `pertPrec` = 1, no perturbation will be applied. Otherwise, value will be used as a **scalar multiplier** to the entire met input precip time series. 



#### Current Model Setup:
* 3-hourly timestep, output at the end of each day
* 30-m spatial resolution
* Forced by 2 stations within model domain
* User-defined lapse rates as defined in Grunes et al., 2025 (Table S1)

**Directory:**

├── code

│└──── model code files for sub-models (i.e. MicroMet, SnowPack, EnBal etc.)

├── figures

│└──── GrADS files to generate figures from SnowModel output

├── met

│└──── directory to manage and place met forcing files

├── outputs

│└──── SnowModel output is directed here 

├── post_process

│└────  Contains .f files to convert .gdat output to .flt and .hdr files 



Model developments are appropriate for only multilayer simulations due to the gravity drainage routines. Liquid water movement relies more-heavily on snow temperature than the default model and therefore requires simulations with model forcing at at least 3-hourly timesteps, or more frequent. 



#### Notes
*Users are cautioned that the developments here are not yet included in the publicly-available SnowModel source code. Differences in model versions are possible. Users are encouraged to inquire about the most-recent model developments and whether the model here is best for their purposes.*

## Getting started
* Download or clone this repository
* Organize forcing, outputs, and supplementary data as directed by snowmodel.par
* Use the compiler (pgf77, gfortran, g77, f77, etc.) of choice to compile and run SnowModel 

###### Sources
* Auer, A. H. (1974). The Rain versus Snow Threshold Temperatures. Weatherwise, 27(2), 67–67. https://doi.org/10.1080/00431672.1974.9931684
* Dai, A. (2008). Temperature and pressure dependence of the rain-snow phase transition over land and ocean. Geophysical Research Letters, 35(12). https://doi.org/10.1029/2008GL033295
* Jennings, K. S., Winchell, T. S., Livneh, B., & Molotch, N. P. (2018). Spatial variation of the rain–snow temperature threshold across the Northern Hemisphere. Nature Communications, 9(1), 1148. https://doi.org/10.1038/s41467-018-03629-7
* Liston, G. E., & Elder, K. (2006). A Distributed Snow-Evolution Modeling System (SnowModel). Journal of Hydrometeorology, 7(6), 1259–1276. https://doi.org/10.1175/JHM548.1
* Pflug, J. M., Liston, G. E., Nijssen, B., & Lundquist, J. D. (2019). Testing Model Representations of Snowpack Liquid Water Percolation Across Multiple Climates. Water Resources Research, 55(6), 4820–4838. https://doi.org/10.1029/2018WR024632
* Stull, R. (2011). Wet-Bulb Temperature from Relative Humidity and Air Temperature. https://doi.org/10.1175/JAMC-D-11-0143.1



