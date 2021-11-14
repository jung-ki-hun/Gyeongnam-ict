$(document).ready(() => {
    $("#jkhajax-1").ready(() => {
        $.ajax({
            url: '/p/list',
            cache: false,
            dataType: 'json',
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                var json_o = JSON.parse(data);
                let json_d = json_o.query;
                test = JSON.parse(json_d);
                var str = "";
                
                 
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                !function ($) {

                    var MorrisCharts = function () {
                    };

                    //creates line chart
                    MorrisCharts.prototype.createLineChart = function (element, data, xkey, ykeys, labels, lineColors) {
                        Morris.Line({
                            element: element,
                            data: data,
                            xkey: xkey,
                            ykeys: ykeys,
                            labels: labels,
                            hideHover: 'auto',
                            gridLineColor: '#eef0f2',
                            resize: true, //defaulted to true
                            lineColors: lineColors,
                            lineWidth: 2
                        });
                    },

                        //creates Donut chart
                        MorrisCharts.prototype.createDonutChart = function (element, data, colors) {
                            Morris.Donut({
                                element: element,
                                data: data,
                                resize: true,
                                colors: colors
                            });
                        },
                        //creates Stacked chart
                        MorrisCharts.prototype.createStackedChart = function (element, data, xkey, ykeys, labels, lineColors) {
                            Morris.Bar({
                                element: element,
                                data: data,
                                xkey: xkey,
                                ykeys: ykeys,
                                stacked: true,
                                labels: labels,
                                hideHover: 'auto',
                                resize: true, //defaulted to true
                                gridLineColor: '#eeeeee',
                                barColors: lineColors
                            });
                        },
                        MorrisCharts.prototype.init = function () {

                            //create line chart
                            var $data = [
                                { y: '2017', a: 23, b: 6 },
                                { y: '2018', a: 36, b: 9 },
                                { y: '2019', a: 49, b: 13 },
                                { y: '2020', a: 60, b: 17 },
                                { y: '2021', a: 68, b: 20 }
                            ];
                            this.createLineChart('morris-line-example', $data, 'y', ['a', 'b'], ['해외', '아시아'], ['#5468da', '#6B9900']);

                            //creating donut chart
                            var $donutData = [
                                { label: "디지털기반 제조업", value: 44.0 },
                                { label: "사물인터넷", value: 22.9 },
                                { label: "인공지능", value: 6.1 },
                                { label: "기타", value: 27 }
                            ];
                            this.createDonutChart('morris-donut-example', $donutData, ['#FF0000', '#FF5E00', '#FFBB00', '#FFE400']);

                            var $stckedData = [
                                { y: 'name01', a: test[0].stock },
                                { y: 'name02', a: test[1].stock }
                            ];
                            this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a'], ['sell'], ['#009688', '#4ac18e']);

                        },
                        //init
                        $.MorrisCharts = new MorrisCharts, $.MorrisCharts.Constructor = MorrisCharts
                }(window.jQuery),

                    //initializing 
                    function ($) {
                        $.MorrisCharts.init();
                    }(window.jQuery);



                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            },
        })
    })
})