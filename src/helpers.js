// the debounce() is helpful specifically for when we are typing inside the text editor, we're going to want to update the database live
// we don't want to send a request every single time we type a letter. We'd want to wait for the user to stop typing for 2 seconds before we update the database so that we are not going insane on the database with all these calls.


export default function debounce(a,b,c){
  var d,e;
  return function(){
    function h(){
      d=null;
      c||(e=a.apply(f,g));
    }
    var f=this,g=arguments;
    return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
  }
}

// This function is going to be for the preview on the left sidebar whenever we delete a note it's going to remove the HTML.
// The text editor library (quill) it displays it as actual HTML. 
// when we display the preview in the sidebar, we don't want to show the HTML tags.
// the removeHTMLTags() function is going to be removing the HTML so we can just see the plain text previews
 
export function removeHTMLTags (str) {
  return str.replace(/<[^>]*>?/gm, '');
};