$(document).ready(function(){$("#range_01").ionRangeSlider(),$("#range_02").ionRangeSlider({min:100,max:1e3,from:550}),$("#range_03").ionRangeSlider({type:"double",grid:!0,min:0,max:1e3,from:200,to:800,prefix:"$"}),$("#range_04").ionRangeSlider({type:"double",grid:!0,min:-1e3,max:1e3,from:-500,to:500}),$("#range_05").ionRangeSlider({type:"double",grid:!0,min:-1e3,max:1e3,from:-500,to:500,step:250}),$("#range_06").ionRangeSlider({grid:!0,from:3,values:["January","February","March","April","May","June","July","August","September","October","November","December"]}),$("#range_07").ionRangeSlider({grid:!0,min:1e3,max:1e6,from:2e5,step:1e3,prettify_enabled:!0}),$("#range_08").ionRangeSlider({min:100,max:1e3,from:550,disable:!0}),$("#range_09").ionRangeSlider({grid:!0,min:18,max:70,from:30,prefix:"Age ",max_postfix:"+"}),$("#range_10").ionRangeSlider({type:"double",min:100,max:200,from:145,to:155,prefix:"Weight: ",postfix:" million pounds",decorate_both:!0}),$("#range_11").ionRangeSlider({skin:"square",type:"single",grid:!0,min:-90,max:90,from:0,postfix:"Â°"}),$("#range_12").ionRangeSlider({skin:"sharp",type:"double",min:1e3,max:2e3,from:1200,to:1800,hide_min_max:!0,hide_from_to:!0,grid:!0}),$("#flat-slider").slider({max:50,min:0,range:!0,values:[15,35]}).slider("pips",{first:"pip",last:"pip"}),$("#flat-slider-vertical-1, #flat-slider-vertical-2, #flat-slider-vertical-3").slider({max:25,min:0,range:"min",value:20,orientation:"vertical"}).slider("pips",{first:"pip",last:"pip"}).slider("float"),$("#alternating-slider").slider({max:1e3,values:[0,300,700,1e3]}).slider("pips",{step:25,rest:"label",labels:{first:"Min",last:"Max"}}).slider("float")});