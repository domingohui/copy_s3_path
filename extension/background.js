(function() {
  chrome.commands.onCommand.addListener((command) => {
    'use strict';
    if (command == 'copy') {
      // Get the current active tab
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        let url = tabs[0].url;
        let match_result = url.match(/http(s)?:\/\/s3\.console\.aws\.amazon\.com\/s3\/buckets\//);
        if (match_result){
          let s3_path_start_index = match_result["index"] + match_result[0].length;
          let s3_path_end_index = url.lastIndexOf("/");
          let path = "s3://"+url.substring(s3_path_start_index, s3_path_end_index)+"/";

          let area = document.createElement("textarea");
          document.body.appendChild(area);
          area.value = path;
          area.select();
          document.execCommand('copy');
          document.body.removeChild(area)
        }
      });
    }
  });
})();
