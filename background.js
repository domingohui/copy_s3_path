(function() {
  chrome.tabs.onUpdated.addListener(function(id, change_info, tab) {
    'use strict';
    let url = (change_info["url"])? change_info["url"] : "" ;
    let match_result = url.match(/http(s)?:\/\/s3\.console\.aws\.amazon\.com\/s3\/buckets\//);
    if (match_result){
      let s3_path_start_index = match_result["index"] + match_result[0].length;
      let s3_path_end_index = url.lastIndexOf("/");
      let path = "s3://"+url.substring(s3_path_start_index, s3_path_end_index);

      let area = document.createElement("textarea");
      document.body.appendChild(area);
      area.value = path;
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area)
    }
  });
})();
