const inputTypesData = [
  { type: "text", attrs: ["name", "placeholder", "maxlength"] },
  { type: "number", attrs: ["name", "min", "max"] },
  { type: "email", attrs: ["name", "placeholder"] },
  { type: "checkbox", attrs: ["name", "checked"] },
  { type: "radio", attrs: ["name", "value", "checked"] },
  { type: "password", attrs: ["name", "minlength", "maxlength"] },
  { type: "date", attrs: ["name", "min", "max"] },
  { type: "file", attrs: ["name", "accept"] },
  { type: "color", attrs: ["name", "value"] },
  { type: "range", attrs: ["name", "min", "max", "step", "value"] },
  { type: "hidden", attrs: ["name", "value"] },
  { type: "submit", attrs: ["name", "value"] },
  { type: "reset", attrs: ["name", "value"] },
  { type: "button", attrs: ["name", "value"] },
  { type: "image", attrs: ["name", "src", "alt"] },
  { type: "select" },
];
const OnlyInputType = () => {
  const inputType = inputTypesData.map((ele) => ele.type);
  return inputType;
};
function updateSelectOptions(array, selectid) {
  if (!array) {
    return;
  }

  var select = $(selectid);
  select.empty();
  var defaultOption = $("<option>", {
    value: null,
    text: "Select any of the heading...",
  });
  select.append(defaultOption);
  for (var i = 0; i < array.length; i++) {
    var option = $("<option>", { value: array[i], text: array[i] });
    select.append(option);
  }
}
$(document).ready(function () {
  loadData();
  $(function () {
    $("main").sortable({
      update: function (event, ui) {
        saveData();
      },
    });
    $(".inner-div").sortable({
      update: function (event, ui) {
        saveData();
      },
      connectWith: ".inner-div",
    });
   
  });
  $("main").on("click", ".delete-section", function () {
    $(this).closest("section").remove();
    saveData();
  });

  $("main").on("click", ".delete-subheading", function () {
    $(this).closest(".mx-5").remove();
    saveData();
  });

  $("main").on("click", ".delete-input", function () {
    var prevInputOrSelect = $(this).prevAll('input:first, select:first');

    // Remove the selected element
    prevInputOrSelect.remove();
    $(this).remove();
    saveData();
  });

  updateSelectOptions(OnlyInputType(), "#selctinputtype");

  $("#SubheadingModalbtn").click(function () {
    populateHeadingSelect();
  });

  $("#form3").click(function () {
    populateHeadingSelectinput2();
    populateheadingsub();
  });

  $("#btn1").click(function () {
    var heading = $("#input1").val();
    if (heading !== "") {
      appendHeading(heading);
      saveData();
    }
  });

  $("#btn2").click(function () {
    var heading = $("#dynamicSelect").val();
    var subheading = $("#input2").val();
    if (heading !== "" && subheading !== "") {
      appendSubheading(heading, subheading);
      saveData();
    }
    populateheadingsub();
  });

  var optionsData = [];
  $("#btn3").click(() => {
    const input1 = $("#selectheading").val();
    const input2 = $("#selectsubheading").val();
    const input3 = $("#selctinputtype").val();
    if (
      input1 == "Select any of the heading..." ||
      input2 == "Select any of the heading..." ||
      input3 == "Select any of the heading..."
    ) {
      alert("select all value");
      return;
    }
    const userInput = $("#selectsubheading").val();
    var selectedDiv = $(
      'section div:has(> h4.subheading:contains("' + userInput + '"))'
    );
    // console.log(selectedDiv, "div for input");
    if (input3 !== "select") {
      var elementValues = {};

      $('input[id="1234"]').each(function () {
        var elementName = $(this).attr("name");
        var elementValue = $(this).val();
        elementValues[elementName] = elementValue;
      });
      var newInput = $(
        `<input class='w-50 d-block mt-2' type=${input3}><button class='delete-input'>Delete Input</button>`
      );
      newInput.attr({
        ...elementValues,
      });
      selectedDiv.append(newInput);
      saveData();
    } else {
      $('input[id="1234"]').each(function () {
        var elementValue = $(this).val();
        optionsData.push(elementValue);
      });
      var selectElement = $("<select>");
      var deleteButton = $("<button class='delete-input'>Delete Input</button>");
      for (let i = 0; i < optionsData.length; i++) {
        var option = $("<option>").text(optionsData[i]).val(optionsData[i]);
        selectElement.append(option); 
      }
      selectedDiv.append(selectElement,deleteButton);
    }
  });

  function populateHeadingSelect() {
    var headings = $(".heading");
    var select = $("#dynamicSelect");
    select.empty();
    headings.each(function () {
      select.append("<option>" + $(this).text() + "</option>");
    });
  }
  function populateHeadingSelectinput2() {
    var headings = $(".heading");
    var select = $("#selectheading");
    select.empty();
    headings.each(function () {
      select.append("<option>" + $(this).text() + "</option>");
    });
  }

  function appendHeading(heading) {
    $("main").append(
      "<section><button class='delete-section'>Delete Section</button><h2 class='heading'>" +
        heading +
        "</h2><div class='inner-div'></div></section>"
    );
  }

  function appendSubheading(heading, subheading) {
    var section = $(".heading:contains('" + heading + "')").closest("section");

    var newSubheadingDiv = $(
      "<div class='mx-5'><h4 class='subheading'>" +
        subheading +
        "</h4><button class='delete-subheading'>Delete Subheading</button></div>"
    );

    section.find(".inner-div").append(newSubheadingDiv);
  }

  function saveData() {
    var contentHtml = $("main").html();
    localStorage.setItem("contentData", contentHtml);
  }

  function loadData() {
    var contentData = localStorage.getItem("contentData");
    if (contentData) {
      $("main").html(contentData);
    }
  }
});
const populateheadingsub = () => {
  const headingText = $("#selectheading").val();

  var selectsubheading = $("#selectsubheading");
  var headingElement = $(".heading:contains('" + headingText + "')");

  var innerDiv = headingElement.next("div.inner-div");

  var subheadings = innerDiv.find("h4.subheading");

  selectsubheading.empty();

  subheadings.each(function () {
    selectsubheading.append("<option>" + $(this).text() + "</option>");
  });
};

const handleInputtypeChange = () => {
  const input3 = $("#selctinputtype").val();
  if (input3 == "Select any of the heading...") {
    return;
  }
  if (input3 == "select") {
    var takeinputdata = $("#takeinputdata");
    takeinputdata.empty();
    var numberInput = $("<input>", {
      type: "number",
      placeholder: "Enter number of options",
      class: "form-control w-50 mt-3",
      require: true,
    });
    const buttonSubmit = $("<button>Submit</button>");

    takeinputdata.append(numberInput, buttonSubmit);
    buttonSubmit.click(() => {
      const noOfOption = parseInt(numberInput.val());

      for (let i = 0; i < noOfOption; i++) {
        var newInput = $("<input>");
        newInput.attr({
          placeholder: "Options...",
          id: 1234,
          // name: i,
        });
        $("#provideoption").append(newInput);
      }
    });
  } else {
    var inputData = {};
    attrArr = inputTypesData.filter((ele) => ele.type === input3);
    var takeinputdata = $("#takeinputdata");
    takeinputdata.empty();
    for (let i of attrArr[0].attrs) {
      var newInput = $("<input>");
      newInput.attr({
        placeholder: i,
        id: 1234,
        name: i,
      });
      takeinputdata.append(newInput);
      inputData[i] = newInput.val();
    }
  }
};
