var jqxhr = $.getJSON( "assets/json/apis.json", function(data) {
    var tempHeader = $("#headerSearch");
    $.each(data, function( key, APIname){
      var APILI = $('<li></li>');
      var APIButton = $('<button class="usa-accordion-button" aria-expanded = "false"></button>');
      APIButton.attr("aria-controls", "b-a" + (key+1));
      APIButton.attr("name", "b-a" + (key+1));
      APIButton.click(addScroll);
      var APISummary = $('<small></small>');
      APISummary.css("font-weight", "400");
      APISummary.html(APIname.summary);
      APIButton.html(APIname.name + ": ");
      APISummary.appendTo(APIButton);
      var APIDiv = $('<div class="usa-accordion-content" style = "display: none"></div');
      APIDiv.attr("id", "b-a" + (key+1));
      APIDiv.html(APIname.html_template);
      //hide tabbing with API is closed;
      $("A", APIDiv).each(function(){
        $(this).attr("tabIndex", -1);
      });
      APIDiv.attr("tabIndex", -1);
      APIButton.appendTo(APILI);
      APIDiv.appendTo(APILI);
      APILI.appendTo("#APIList");
      var addHeader = $("<div class = 'usa-width-one-whole'><a sum = '" + APIname.summary + "' href = '#b-a" + (key+1) + "' class = 'search-dropdown'><span>" + APIname.name + "</span></a></div>");
      addHeader.appendTo(tempHeader);
    });
  })
    .done(function() {
      console.log( "success" );
    })
    .fail(function() {
      console.log( "API Info Download Unsuccesfull" );
    });
// function to initiate a scroll when a API tab is extended
    async function addScroll(){
      var APIDiv = $(this).next();
      if($(this).attr("aria-expanded") == "true"){
        $("A", APIDiv).each(function(){
          $(this).attr("tabIndex", -1);
        });
      }
      else{
        $("A", APIDiv).each(function(){
          $(this).removeAttr("tabIndex");
        });
      }
      var result = await resolveAfterTenthSeconds();
      goTo(this.name);
    }