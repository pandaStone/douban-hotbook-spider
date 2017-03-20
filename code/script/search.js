$(function(){
 
    $(".bigNav li").hover(function(){
        $(this).find('.smlNav').show();
    },function(){
        $(this).find('.smlNav').hide();
    })
    
    $('#searchwindow').blur(function(){
        if($(this).val() == ''){
            $('#find').hide();
        }
    }).keyup(function(e){
        if(e.which == 13) {
            $('#find').show();
            var type = '';
            var to = $(this).val();
            //检测标签对应分类
            if (to=='小说'||to=='外国文学'||to=='文学'||to=='随笔'||to=='中国文学'||to=='经典'||to=='散文'||to=='日本文学'||to=='村上春树'||to=='童话'||to=='诗歌'||to=='杂文'||to=='王小波'||to=='儿童文学'||to=='古典文学'||to=='张爱玲'||to=='余华'||to=='名著'||to=='当代文学'||to=='钱钟书'||to=='鲁迅'||to=='外国名著'||to=='诗词'||to=='茨威格'||to=='米兰·昆德拉'||to=='杜拉斯'||to=='港台'){
                type = '文学';}
            if(to=='漫画'||to=='绘本'||to=='推理'||to=='青春'||to=='言情'||to=='科幻'||to=='东野圭吾'||to=='悬疑'||to=='武侠'||to=='韩寒'||to=='奇幻'||to=='日本漫画'||to=='耽美'||to=='亦舒'||to=='三毛'||to=='安妮宝贝'||to=='网络小说'||to=='郭敬明'||to=='推理小说'||to=='穿越'||to=='金庸'||to=='轻小说'||to=='阿加莎·克里斯蒂'||to=='几米'||to=='张小娴'||to=='幾米'||to=='魔幻'||to=='青春文学'||to=='科幻小说'||to=='J.K.罗琳'||to=='高木直子'||to=='古龙'||to=='沧月'||to=='落落'||to=='张悦然'||to=='蔡康永'){ 
                type = '流行';}
            if( to=='历史'||to=='心理学'||to=='哲学'||to=='传记'||to=='文化'||to=='社会学'||to=='艺术'||to=='设计'||to=='政治'||to=='社会'||to=='建筑'||to=='宗教'||to=='电影'||to=='数学'||to=='政治学'||to=='回忆录'||to=='思想'||to=='中国历史'||to=='国学'||to=='音乐'||to=='人文'||to=='戏剧'||to=='人物传记'||to=='绘画'||to=='艺术史'||to=='佛教'||to=='军事'||to=='西方哲学'||to=='近代史'||to=='二战'||to=='自由主义'||to=='考古'||to=='美术'){ 
                type = '文化';}
            if( to=='爱情'||to=='旅行'||to=='生活'||to=='励志'||to=='成长'||to=='心理'||to=='摄影'||to=='女性'||to=='职场'||to=='美食'||to=='教育'||to=='游记'||to=='灵修'||to=='健康'||to=='情感'||to=='手工'||to=='养生'||to=='两性'||to=='人际关系'||to=='家居'||to=='自助游'){ 
                type = '生活';}
            if( to=='经济学'||to=='管理'||to=='经济'||to=='金融'||to=='商业'||to=='投资'||to=='营销'||to=='创业'||to=='理财'||to=='广告'||to=='股票'||to=='企业史'||to=='策划') { 
               type = '经管';}
            if( to=='科普'||to=='互联网'||to=='编程'||to=='科学'||to=='交互设计'||to=='用户体验'||to=='算法'||to=='web'||to=='科技'||to=='UE'||to=='通信'||to=='交互'||to=='UCD'||to=='神经网络'||to=='程序'){ 
                type = '科技';}
            
            var star_html = document.getElementById("star");
            var reader_html = document.getElementById("reader");
            //清空上次的搜索
            star_html.innerHTML ="<p>按评价排序</p>";
            reader_html.innerHTML = "<p>按阅读人数排序</p>";
            var front_path = 'search/' + type + '/' + to +'/' ;
            
            $.get(front_path +"star_show.txt").success(function(content){
               var s_array = content.split('@');
                for (var j=0;j<s_array.length-1;j++){
                    $.get(s_array[j]).success(function(txt){ 
                    var to_add = '<div class="book"><span>'+ txt +'</span></div>';
                    star_html.innerHTML += to_add;
                    }); 
                }
            });                     

            $.get(front_path + "reader_show.txt").success(function(content){
               var r_array = content.split('@');
                for (var j=0;j<r_array.length-1;j++){
                    $.get(r_array[j]).success(function(txt){ 
                    var add_to = '<div class="book"><span>'+ txt +'</span></div>';
                    reader_html.innerHTML += add_to;
                    }); 
                }
            });
    }});
    
$('.subitem em a').click(function(){
        {
            $('#find').show();
            var type = '';
            var to = $(this).text();
            //检测标签对应分类
            if (to=='小说'||to=='外国文学'||to=='文学'||to=='随笔'||to=='中国文学'||to=='经典'||to=='散文'||to=='日本文学'||to=='村上春树'||to=='童话'||to=='诗歌'||to=='杂文'||to=='王小波'||to=='儿童文学'||to=='古典文学'||to=='张爱玲'||to=='余华'||to=='名著'||to=='当代文学'||to=='钱钟书'||to=='鲁迅'||to=='外国名著'||to=='诗词'||to=='茨威格'||to=='米兰·昆德拉'||to=='杜拉斯'||to=='港台'){
                type = '文学';}
            if(to=='漫画'||to=='绘本'||to=='推理'||to=='青春'||to=='言情'||to=='科幻'||to=='东野圭吾'||to=='悬疑'||to=='武侠'||to=='韩寒'||to=='奇幻'||to=='日本漫画'||to=='耽美'||to=='亦舒'||to=='三毛'||to=='安妮宝贝'||to=='网络小说'||to=='郭敬明'||to=='推理小说'||to=='穿越'||to=='金庸'||to=='轻小说'||to=='阿加莎·克里斯蒂'||to=='几米'||to=='张小娴'||to=='幾米'||to=='魔幻'||to=='青春文学'||to=='科幻小说'||to=='J.K.罗琳'||to=='高木直子'||to=='古龙'||to=='沧月'||to=='落落'||to=='张悦然'||to=='蔡康永'){ 
                type = '流行';}
            if( to=='历史'||to=='心理学'||to=='哲学'||to=='传记'||to=='文化'||to=='社会学'||to=='艺术'||to=='设计'||to=='政治'||to=='社会'||to=='建筑'||to=='宗教'||to=='电影'||to=='数学'||to=='政治学'||to=='回忆录'||to=='思想'||to=='中国历史'||to=='国学'||to=='音乐'||to=='人文'||to=='戏剧'||to=='人物传记'||to=='绘画'||to=='艺术史'||to=='佛教'||to=='军事'||to=='西方哲学'||to=='近代史'||to=='二战'||to=='自由主义'||to=='考古'||to=='美术'){ 
                type = '文化';}
            if( to=='爱情'||to=='旅行'||to=='生活'||to=='励志'||to=='成长'||to=='心理'||to=='摄影'||to=='女性'||to=='职场'||to=='美食'||to=='教育'||to=='游记'||to=='灵修'||to=='健康'||to=='情感'||to=='手工'||to=='养生'||to=='两性'||to=='人际关系'||to=='家居'||to=='自助游'){ 
                type = '生活';}
            if( to=='经济学'||to=='管理'||to=='经济'||to=='金融'||to=='商业'||to=='投资'||to=='营销'||to=='创业'||to=='理财'||to=='广告'||to=='股票'||to=='企业史'||to=='策划') { 
               type = '经管';}
            if( to=='科普'||to=='互联网'||to=='编程'||to=='科学'||to=='交互设计'||to=='用户体验'||to=='算法'||to=='web'||to=='科技'||to=='UE'||to=='通信'||to=='交互'||to=='UCD'||to=='神经网络'||to=='程序'){ 
                type = '科技';}
            
            var star_html = document.getElementById("star");
            var reader_html = document.getElementById("reader");
            //清空上次的搜索
            star_html.innerHTML ="<p>按评价排序</p>";
            reader_html.innerHTML = "<p>按阅读人数排序</p>";
            var front_path = 'search/' + type + '/' + to +'/' ;
            
            
            $.get(front_path +"star_show.txt").success(function(content){
               var s_array = content.split('@');
                for (var j=0;j<s_array.length-1;j++){
                    $.get(s_array[j]).success(function(txt){ 
                    var to_add = '<div class="book"><span>'+ txt +'</span></div>';
                    star_html.innerHTML += to_add;
                    }); 
                }
            });                     

            $.get(front_path + "reader_show.txt").success(function(content){
               var r_array = content.split('@');
                for (var j=0;j<r_array.length-1;j++){
                    $.get(r_array[j]).success(function(txt){ 
                    var add_to = '<div class="book"><span>'+ txt +'</span></div>';
                    reader_html.innerHTML += add_to;
                    }); 
                }
            });

    }});
    
    
})