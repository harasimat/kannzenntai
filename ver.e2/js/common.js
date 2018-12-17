/* ===================================================================

 * 繝ｭ繝ｼ繝ｫ繧ｪ繝ｼ繝舌�

=================================================================== */
$.fn.rollover = function() {
    return this.each(function() {
        // 逕ｻ蜒丞錐繧貞叙蠕�
        var src = $(this).attr('src');
        //縺吶〒縺ｫ逕ｻ蜒丞錐縺ｫ縲契on.縲阪′莉倥＞縺ｦ縺�◆蝣ｴ蜷医√Ο繝ｼ繝ｫ繧ｪ繝ｼ繝舌�蜃ｦ逅�ｒ縺励↑縺�
        if (src.match('_on.')) return;
        // 繝ｭ繝ｼ繝ｫ繧ｪ繝ｼ繝舌�逕ｨ縺ｮ逕ｻ蜒丞錐繧貞叙蠕暦ｼ�_on繧剃ｻ伜刈��
        var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1_on$2");
        // 逕ｻ蜒上�繝励Μ繝ｭ繝ｼ繝会ｼ亥�隱ｭ縺ｿ霎ｼ縺ｿ��
        $('').attr('src', src_on);
        // 繝ｭ繝ｼ繝ｫ繧ｪ繝ｼ繝舌�蜃ｦ逅�
        $(this).hover(
            function() { $(this).attr('src', src_on); },
            function() { $(this).attr('src', src); }
        );
    });
};


/* ===================================================================

 * 繝壹�繧ｸ繝医ャ繝励∈縺ｮ謌ｻ繧�

=================================================================== */
$(function(){
    // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺吶ｋ縺ｨ陦ｨ遉ｺ縺吶ｋ繧ｨ繝ｪ繧｢
    var element = $('#pageTop');
    // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ驥上�險ｭ螳�
    var position = 400; // 蜊倅ｽ搾ｼ嗔x
    // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺吶ｋ縺ｨ陦ｨ遉ｺ縺吶ｋ繧ｨ繝ｪ繧｢繧帝撼陦ｨ遉ｺ
    element.hide();
    $(window).scroll(function(){
        // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺吶ｋ縺ｨ陦ｨ遉ｺ縺輔○繧�
        if ($(this).scrollTop() > position) {
            $(element).fadeIn();
        } else {
            $(element).fadeOut();
        }
    });
});


/* ===================================================================

 * 繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ

=================================================================== */
$(function(){
    // #縺ｧ蟋九∪繧九い繝ｳ繧ｫ繝ｼ繧偵け繝ｪ繝�け縺励◆蝣ｴ蜷医↓蜃ｦ逅�
    $('a[href^=#]').click(function() {
        // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺ｮ騾溷ｺｦ
        var speed = 400;// 繝溘Μ遘�
        // 繧｢繝ｳ繧ｫ繝ｼ縺ｮ蛟､蜿門ｾ�
        var href= $(this).attr("href");
        // 遘ｻ蜍募�繧貞叙蠕�
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 遘ｻ蜍募�繧呈焚蛟､縺ｧ蜿門ｾ�
        var position = target.offset().top;
        // 繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
});


/* ===================================================================

 * 繧ｳ繝ｳ繝�Φ繝��鬮倥＆繧呈純縺医ｋ

=================================================================== */
$.fn.uniformHeight = function() {
    var maxHeight = 0;
    this.each(function() {
        var thisHeight = $(this).height();
        if(thisHeight > maxHeight){
            maxHeight = thisHeight;
        }
    });
    $(this).height(maxHeight);
};