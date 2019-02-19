$(".selectable").click(function() {
    $(this).select();
});

function CopyToClipboard(containerid) {
    if (document.selection) { 
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy"); 
    
    } else if (window.getSelection) {
        var range = document.createRange();
         range.selectNode(document.getElementById(containerid));
         window.getSelection().addRange(range);
         document.execCommand("copy");
         alert("Copied");
         if (window.getSelection) {window.getSelection().removeAllRanges();}
         else if (document.selection) {document.selection.empty();}
    }}