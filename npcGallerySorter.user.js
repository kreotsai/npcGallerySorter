// ==UserScript==
// @name         NPC Gallery Sorter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ranks gallery items
// @author       plushies
// @match        *neopetsclassic.com/gallery/edit/rankings/*
// @updateURL    https://github.com/kreotsai/npcGallerySorter/raw/main/npcGallerySorter.user.js
// @downloadURL  https://github.com/kreotsai/npcGallerySorter/raw/main/npcGallerySorter.user.js
// @icon         https://www.google.com/s2/favicons?domain=neopetsclassic.com
// @grant        none
// ==/UserScript==

//Currently ranks items by name when the page loads. Working on implementing sorting for mars' color ranking script!

window.addEventListener("load", function(){
var catArr = [];

try
{
    var items = document.querySelector("body > table:nth-child(5) > tbody > tr > td:nth-child(3) > div > form > table > tbody");
    items = items.getElementsByTagName("td");
}
    catch (error)
    {
        console.log("not using 2004 theme, trying again");

        try
        {
            items = document.querySelector("body > table:nth-child(4) > tbody > tr > td:nth-child(3) > div > form > table > tbody");
            items = items.getElementsByTagName("td");
        }

         catch (error)
    {
        console.log("not finding the table, sorry charlie :frowning: let plushies know and she'll look into it");
        return
    }

    }



for (var cat in items)
{
  if (items[cat].innerText != undefined && items[cat] != items[0])
  {
      var name = items[cat].innerText.split("\nQty :")[0];
      if (name.length != 0)
      {
       name = name.split(/\r?\n/)[1];
       catArr.push(name);
      }
  }
}


catArr.sort();

for (var i in items)
{
 try
 {
     var item = items[i];
     var itemName = item.getElementsByTagName("b")[0].innerText;

     if (itemName != undefined)
     {
     var input = item.getElementsByTagName("input")[0];
         
         if (catArr.includes(itemName))
             {
             input.value = catArr.indexOf(itemName);
             }

     }



 }
    catch (error)
    {
        console.log("this is not a valid cell");
    }

}

});
