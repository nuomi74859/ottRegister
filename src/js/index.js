/**
 * Created by nuomi on 14-8-4.
 */
define(function(require){
    require('jquery');
    $('.btn-warp').addClass('animate-helix');
    setTimeout(function(){
        require.async(['js/tvKey.source.js','bootstrap'],function(){
            var $input = $('input');
            var $temp = '';
            akh.parent='html';
            akh.init();
            $input.tooltip({
                title:'按确认呼出键盘',
                placement:'right'
            });
            $('.nav a').click(function(){
                setTimeout(function(){
                    akh.parent='html';
                    akh.init();
                },300);
            });
            $(document).on({
                'keydown':function(){
                    setTimeout(function(){
                        if($input.hasClass('focusBtn on')) {
                            var $fo = $('.focusBtn.on');
                            $temp != '' && $temp.get(0) != $fo.get(0) ? $temp.tooltip('hide') : '';
                            $fo.tooltip('show');
                            $temp = $fo;
                        }
                        else {
                            $temp != '' ? $temp.tooltip('hide') : '';
                        }
                    },20);
                }
            });
        });
    },20);
});
