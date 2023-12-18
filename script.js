let selectedIndex;
let selectedIndex2;
let selectedIndex3;
const mySubmitFunction = (e)=>{
  e.preventDefault()
  return false;
}
function saveData() {
  var contentHtml = $("main").html();
  localStorage.setItem("contentData", contentHtml);
}
const appendForm = (takeinputdata) => {
  takeinputdata.empty();
  takeinputdata.append(` <div id="attributeForm" class="d-flex">
  <label for="id">ID:</label>
  <input type="text" id="id" name="id">

  <label for="class">Class:</label>
  <input type="text" id="class" name="class">

  <label for="value">Value:</label>
  <input type="text" id="value" name="value">

  <label for="disabled">Disabled:</label>
  <input type="checkbox" id="disabled" name="disabled">

  <label for="readonly">Readonly:</label>
  <input type="checkbox" id="readonly" name="readonly">

  <label for="placeholder">Placeholder:</label>
  <input type="text" id="placeholder" name="placeholder">

  <label for="maxlength">Max Length:</label>
  <input type="number" id="maxlength" name="maxlength">

  <label for="minLength">Min Length:</label>
  <input type="number" id="minLength" name="minLength">


</div>`);
};

const getIndexOfSelectedHeading = ()=>{
  $("#dynamicSelect").on("change", function () {
    selectedIndex = $(this).prop("selectedIndex");
  });
}
const getIndexOfSelectedHeading2 = ()=>{
  $("#selectheading").on("change", function () {
    selectedIndex2 = $(this).prop("selectedIndex");
    populateheadingsub()
  });
}
const getIndexOfSelectedHeading3 = ()=>{
  $("#selectsubheading").on("change", function () {
    selectedIndex3 = $(this).prop("selectedIndex");
  });
}
const sortableFunction = () => {
  $(function () {
    $("main").sortable({
      update: function (event, ui) {
        saveData();
      },
      cursor: "move",
    });
    $("aside").sortable({
      update: function (event, ui) {
        saveData();
      },
      cursor: "move",
      connectWith: "aside",
    });
    $(".mx-5").sortable({
      connectWith: "aside > div",
      items: "> form",
      cursor: "move",
      update: function (event, ui) {
        saveData();
      },
    });
  });
};

const inputTypesData = [
  {
    type: "text",
    attrs: ["name", "placeholder", "maxlength", "label", "required"],
  },
  { type: "number", attrs: ["name", "min", "max", "label"] },
  { type: "email", attrs: ["name", "placeholder", "label"] },
  { type: "checkbox", attrs: ["name", "checked", "label"] },
  { type: "radio", attrs: ["name", "value", "checked", "label"] },
  { type: "password", attrs: ["name", "minlength", "maxlength", "label"] },
  { type: "date", attrs: ["name", "min", "max"] },
  { type: "file", attrs: ["name", "accept"] },
  { type: "color", attrs: ["name", "value"] },
  { type: "range", attrs: ["name", "min", "max", "step", "value", "label"] },
  { type: "hidden", attrs: ["name", "value"] },
  { type: "submit", attrs: ["name", "value"] },
  { type: "reset", attrs: ["name", "value"] },
  { type: "button", attrs: ["name", "value"] },
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
  sortableFunction();
  getIndexOfSelectedHeading()
  getIndexOfSelectedHeading2()
  getIndexOfSelectedHeading3()
  $("main").on("click", ".delete-section", function () {
    $(this).closest("section").remove();
    saveData();
  });

  $("main").on("click", ".delete-subheading", function () {
    $(this).closest(".mx-5").remove();
    saveData();
  });

  $("main").on("click", ".delete-input", function () {
    var inputContainer = $(this).closest("form");

    inputContainer.remove();
    saveData();
  });

  updateSelectOptions(OnlyInputType(), "#selctinputtype");

  $("#SubheadingModalbtn").click(function () {
    populateHeadingSelect();
  });
  $("#form3").click(function () {
    populateHeadingSelectinput2();
  });
  $("#btn1").click(function () {
    var heading = $("#input1").val();
    if (heading === "") {
      alert("provide heading");
      return;
    }
    appendHeading(heading);
    saveData();
    $("#input1").val("");
    sortableFunction();
  });

  $("#btn2").click(function () {
    var heading = $("#dynamicSelect").val();
    var subheading = $("#input2").val();
    if (heading === "" || subheading === ""||heading=="Select Heading") {
      alert("enter both value");
      return;
    } else {
      appendSubheading(heading, subheading);
      saveData();
    }
    $("#input2").val("");
    sortableFunction();
  });

  var optionsData = [];
  $("#btn3").click(() => {
    const input1 = $("#selectheading").val();
    const input2 = $("#selectsubheading").val();
    const input3 = $("#selctinputtype").val();
    if (
      input1 == "Select heading..." ||
      input2 == "Select subheading..." ||
      input3 == "Select any of the heading..." ||
      input2 == null 
    ) {
      alert("select all value");
      return;
    }
    var section = $("main > section").eq(selectedIndex2-1);
    var targetDiv = section.find("aside > div.mx-5").eq(selectedIndex3-1);
    const selectedDiv = targetDiv;
    if (input3 == "select") {
      $('input[id="1234"]').each(function () {
        var elementValue = $(this).val();
        optionsData.push(elementValue);
      });
      var selectElement = $(
        "<form class=' p-2 my-2 d-flex align-items-center mx-4'><select class='form-select w-25'></select></form>"
      );
      for (let i = 0; i < optionsData.length; i++) {
        var option = $("<option>").text(optionsData[i]).val(optionsData[i]);
        selectElement.find("select").append(option);
      }

      var deleteButton = $(
        "<button class='delete-input btn btn-info btn-sm my-2'>Delete Input</button>"
      );

      selectElement.append(deleteButton);
      selectedDiv.append(selectElement);
      saveData();
    } else {
      var id = $("#id").val();
      var className = $("#class").val();
      var value = $("#value").val();
      var disabled = $("#disabled").prop("checked");
      var readonly = $("#readonly").prop("checked");
      var placeholder = $("#placeholder").val();
      var maxlength = $("#maxlength").val();
      var minLength = $("#minLength").val();
      var name = $("#inputName").val();
      var newInput = $(
        `<form class=' p-2 my-2 d-flex align-items-center mx-4'><input class='w-50 d-block mt-2'><button class='delete-input btn btn-info btn-sm'>Delete Input</button></form>`
      );
      switch (input3) {
        case "text":
          newInput.find("input").attr({
            id: id,
            type: "text",
            class: className,
            value: value,
            disabled: disabled ? "disabled" : undefined,
            readonly: readonly ? "readonly" : undefined,
            placeholder: placeholder,
            maxlength: maxlength,
            minlength: minLength,
          });
          break;
        case "number":
          newInput.find("input").attr({
            id: id,
            type: "number",
            class: className,
            value: value,
            disabled: disabled ? "disabled" : undefined,
            placeholder: placeholder,
            maxlength: maxlength,
            minlength: minLength,
          });
          break;
        case "checkbox":
          newInput = $(
            `<form class=' p-2 my-2 d-flex align-items-center mx-4'><button class='delete-input btn btn-info btn-sm'>Delete Input</button></form>`
          );
          var checkboxValues = value.split(",");
          checkboxValues.forEach(function (checkboxValue) {
            checkboxValue = checkboxValue.trim();
            var checkboxElement = $("<input>", {
              id: id + "_" + checkboxValue,
              type: "checkbox",
              class: className,
            });
            var labelElement = $("<label>", {
              for: id + "_" + checkboxValue,
              text: checkboxValue,
            });
            newInput.prepend(checkboxElement, labelElement);
          });
          break;
        case "radio":
          newInput = $(
            `<div class=' p-2 my-2 d-flex align-items-center mx-4'><button class='delete-input btn btn-info btn-sm'>Delete Input</button></div>`
          );
          var radioValue = value.split(",");
          radioValue.forEach(function (radioValues) {
            radioValues = radioValues.trim();
            var radioElement = $("<input>", {
              id: id + "_" + radioValues,
              type: "radio",
              class: className,
            });
            var labelElement = $("<label>", {
              for: id + "_" + radioValues,
              text: radioValues,
            });
            newInput.prepend(radioElement, labelElement);
          });
          break;
        case "submit":
          newInput.find("input").attr({
            id: id,
            type: "submit",
            class: className,
            value: value,
            name:name,
            disabled: disabled ? "disabled" : undefined,
          });
          break
        case "range":
          console.log('here in submit',maxlength,minLength)
          newInput.find("input").attr({
            type: "range",
            id: id, 
            min: minLength,           
            max: maxlength,        
            value: value        
          });
          break
        default:
          newInput.find("input").attr({
            id: id,
            type: input3,
            class: className,
            value: value,
            disabled: disabled ? "disabled" : undefined,
            readonly: readonly ? "readonly" : undefined,
            placeholder: placeholder,
            maxlength: maxlength,
            minlength: minLength,
          });
          break;
      }

      selectedDiv.append(newInput);
    }
    saveData();
    $("selctinputtype").val("Select any of the heading...");
  });

  function populateHeadingSelect() {
    var headings = $("h2");
    var select = $("#dynamicSelect");
    select.empty();
    select.append("<option selected>" + "Select Heading" + "</option>");
    headings.each(function () {
      select.append("<option>" + $(this).text() + "</option>");
    });
  }
  function populateHeadingSelectinput2() {
    var headings = $("h2");
    var select = $("#selectheading");
    select.empty();
    select.append("<option>" +"Select heading" + "</option>");
    headings.each(function () {
      select.append("<option>" + $(this).text() + "</option>");
    });
  }

  function appendHeading(heading) {
    $("main").append(
      "<section class='bg-light w-50 my-2 p-2 position-relative'><button class='delete-section btn btn-danger position-absolute end-0 mx-2'>⨯</button><h2 class='heading'>" +
        heading +
        "</h2><aside class=' p-3'></aside></section>"
    );
  }

  function appendSubheading(heading, subheading) {
    getIndexOfSelectedHeading()
    console.log(selectedIndex)
    var section = $("main > section").eq(selectedIndex - 1);
    if (section.length === 0) {
      console.error("Section not found for heading: " + heading);
      return;
    }

    var newSubheadingDiv = $(
      "<div class='mx-5 bg-secondary w-50 my-2 p-2 position-relative'><h4 class='subheading'>" +
        subheading +
        "</h4><button class='delete-subheading btn btn-danger position-absolute end-0 top-0 mx-2'>⨯</button></div>"
    );

    section.find("aside").append(newSubheadingDiv);
  }

  function loadData() {
    var contentData = localStorage.getItem("contentData");
    if (contentData) {
      $("main").html(contentData);
    }
  }
});
const populateheadingsub = () => {
  var section = $("main > section").eq(selectedIndex2-1);
  console.log(section, "section....");
  const h4Elements = section.find("h4.subheading");
  
  console.log(h4Elements,"h4elements....")
  const h4TextArray = h4Elements.map(function() {
    return $(this).text();
  }).get();
  console.log(h4TextArray)
  var selectsubheading = $("#selectsubheading");
 

  selectsubheading.empty();
  selectsubheading.append("<option>" + "select subheading" + "</option>");
  if (h4TextArray && h4TextArray.length) {
    for(let i=0;i<h4TextArray.length;i++){
      selectsubheading.append("<option>" + h4TextArray[i] + "</option>");
    }
    
  } else {
    console.log("h4TextArray is not defined or empty.");
  }
};

const handleInputtypeChange = () => {
  const input3 = $("#selctinputtype").val();

  if (input3 == "Select any of the heading...") {
    return;
  }

  var takeinputdata = $("#takeinputdata");
  takeinputdata.empty();

  if (input3 == "select") {
    var numberInput = $("<input>", {
      type: "number",
      placeholder: "Enter the number of options",
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
        });
        $("#provideoption").append(newInput);
      }
      takeinputdata.show();
    });
  } else if (input3 == "checkbox") {
    takeinputdata.empty();
    appendForm(takeinputdata);
    // var value = $("#value").hide();
    var disabled = $("#disabled").hide();
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  } else if (input3 == "radio") {
    takeinputdata.empty();
    appendForm(takeinputdata);
    // var value = $("#value").hide();
    var disabled = $("#disabled").hide();
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  } 
  else if(input3=="date"){
    takeinputdata.empty();
    appendForm(takeinputdata);
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  }
  else if(input3=="file"){
    takeinputdata.empty();
    appendForm(takeinputdata);
    var disabled = $("#disabled").hide();
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  }
  else if(input3=="color"){
    takeinputdata.empty();
    appendForm(takeinputdata);
    var disabled = $("#disabled").hide();
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  }
  else if(input3=="range"){
    takeinputdata.empty();
    appendForm(takeinputdata);
    // var value = $("#value").hide();
    var disabled = $("#disabled").hide();
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
  }
  else if(input3=="hidden"){
    takeinputdata.empty();
    appendForm(takeinputdata);
    var disabled = $("#disabled").hide();
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  }
  else if(input3=="submit"){
    takeinputdata.empty();
    appendForm(takeinputdata);
    var nameLabel = $("<label>").text("Name");

    // Create an input element with type text and an ID
    var nameInput = $("<input>").attr({
      type: "text",
      id: "inputName" // set your desired ID
    });
    
    // Append the label and input to the form
    $("#takeinputdata form").prepend(nameLabel, nameInput);
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  }
  else if(input3=="button"){
    takeinputdata.empty();
    appendForm(takeinputdata);
    var readonly = $("#readonly").hide();
    var placeholder = $("#placeholder").hide();
    var maxlength = $("#maxlength").hide();
    var minLength = $("#minLength").hide();
  }
  else {
    takeinputdata.empty();
    appendForm(takeinputdata);
  }
};
