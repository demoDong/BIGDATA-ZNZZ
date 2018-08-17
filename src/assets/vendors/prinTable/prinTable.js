
function getData(year){
    $.ajax({
        url:"http://219.239.97.111:10075/api/351/query?params=Year:e:" + year,
        async:false,
        success:function(data){
            if(data.status == 000){
                Data = data.result;
                var PerIindexAvg = Data[0].PerIindexAvg;
                var BasicConditionIndexAvg = Data[0].BasicConditionIndexAvg;
                var DevIndexAvg = Data[0].DevIndexAvg;
                $.each(Data,function(index,value){
                    $("#alltable tbody").append('<tr data-id="'+index+'"><td class="focusBg">'+value.Rank+'</td><td class="focusBg">'+value.Province+'</td><td class="focusBg">'+value.City+'</td><td class="focusBg">'+value.Country+'</td><td class="tdBG1">'+value.CompetitivenessIndex+'</td><td class="tdBG2">'+value.BasicConditionIndex+'</td><td class="tdBG3">'+value.PerIindex+'</td><td class="tdBG4">'+value.DevIndex+'</td><td class="lastTd">'+value.PrimeIndustry+"</td></tr>");
                })
                $.each($(".tdBG1"),function(){
                    $(this).css({"background-size":$(this).text()+"% 26px","background-position":"0px 2px"});
                })
                $.each($(".tdBG2"),function(){
                    if($(this).text() < BasicConditionIndexAvg){
                        $(this).css({"background":'url("td-bd3.png") no-repeat',"background-size":$(this).text()+"% 26px","background-position":"0px 2px"});

                    }else{
                        $(this).css({"background":'url("td-bd2.png") no-repeat',"background-size":$(this).text()+"% 26px","background-position":"0px 2px"});

                    }
                })
                $.each($(".tdBG3"),function(){
                    if($(this).text() < PerIindexAvg){
                        $(this).css({"background":'url("easyreport/../../../assets/images/td-bd3.png") no-repeat',"background-size":$(this).text()+"% 26px","background-position":"0px 2px"});

                    }else{
                        $(this).css({"background":'url("td-bd2.png") no-repeat',"background-size":$(this).text()+"% 26px","background-position":"0px 2px"});

                    }
                })
                $.each($(".tdBG4"),function(){
                    if($(this).text() < DevIndexAvg){
                        $(this).css({"background":'url("td-bd3.png") no-repeat',"background-size":$(this).text()+"% 26px","background-position":"0px 2px"});

                    }else{
                        $(this).css({"background":'url("td-bd2.png") no-repeat',"background-size":$(this).text()+"% 26px","background-position":"0px 2px"});

                    }
                })
            }else{
                alert("数据加载失败");
            }
        },
        error:function(){
            alert("数据加载失败");
        }
    });
}


$(function(){
    $("#chart171>div").append('<div class="containerBox"><table id="alltable" class="tablesorter" cellspacing="0">   <thead>   <tr> <th>排名</th>  <th>省</th>   <th>市</th>   <th>县</th>   <th class="spec">竞争力指数</th>   <th class="spec">基础条件指数</th>  <th class="spec">运行绩效指数</th> <th class="spec">发展活力指数</th> <th>主导产业</th> </tr>   </thead>   <tbody></tbody>   </table>   </div>');

    //页面数据初始化
    getData(2017);
    $("#alltable").tablesorter();
})