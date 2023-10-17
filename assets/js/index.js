const show = () => {
  // console.log($("input[type=radio][name=gender]").filter(":checked")[0]?.value)
  if (!$("#nametext").val()) {
    alert("Please fill the name");
    return;
  }

  if (!$("#mailtext").val()) {
    alert("Please fill the mail");
    return;
  }

  if (!$("input[type=radio][name=gender]").filter(":checked")[0]?.value) {
    alert("Please Select one Gender");
    return;
  }

  if (!$("input[type=radio][name=status]").filter(":checked")[0]?.value) {
    alert("Please Select one Status");
    return;
  }

  let formData = {
    name: $("#nametext").val(),
    email: $("#mailtext").val(),
    gender: $("input[type=radio][name=gender]").filter(":checked")[0]?.value,
    status: $("input[type=radio][name=status]").filter(":checked")[0]?.value,
  };

  // console.log("form data-----", formData)
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(formData),
  };

  fetch("/api/user", options)
    .then((res) => res.json())
    .then((res) => {
      console.log("results------", res);
      window.location.reload();
    })
    .catch((err) => {
      alert(err.message);
    });
};

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  console.log(data);

  let updated = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  };

  fetch(`/api/user/${data.id}`, updated)
    .then((res) => res.json())
    .then((res) => {
      console.log("results------", res);
      window.location.reload();
    })
    .catch((err) => {
      alert(err.message);
    });

  $.ajax(request).done(function (response) {
    alert("Data updated successfully");
  });
});

// to DELETE Data from Both DataBase and List

let deleteData = (id) => {
  if (confirm("Do You really want to delete this record")) {
    let deleted = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    fetch(`/api/user/${id}`, deleted)
      .then((res) => res.json())
      .then((res) => {
        console.log("results------", res);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
};
