// $.ajax({
//   url:"https://studentcrudforlesson.herokuapp.com/api/student/get",
//   method:"get",
//   success:function(javob){
//     students=javob;
//     console.log(students);
//     chiz();

//   },
//   error:function(error){
//     console.log(error);
//     $("h2").html("xatolik");
//   },

// });

// const chiz=()=>{
//   let myText="";
//   students.forEach((student, index) => {
//     myText+=`<tr>
//     <th scope="row"> ${index+1} </th>
//     <td>${student.firstname}</td>
//     <td>${student.lastname}</td>
//     <td>${student.username}</td>
//     <td>${student.phoneNumber}</td>
//     </tr>
//     `
//   });
//   $(".tableBody").html(myText);
// };


let currentId=null;

// my old homework
$('.myInput').on('input',function(){
  // console.log($(this).val());
  // console.log($(this).val().charAt($(this).val().length-1));
  let red=Math.random()*256;
  let green=Math.random()*256;
  let blue=Math.random()*256;
  let span=document.createElement("span");
  span.innerHTML=$(this).val().charAt($(this).val().length-1);
  span.style.color=`rgb(${red},${green},${blue})`;
  $("#h2").append(span);
});

// query GET with ajax
const getAllStudents=()=>{
  $.ajax({
  url:"https://studentcrudforlesson.herokuapp.com/api/student/get",
  method:'GET',
  success:function(response){
    students=response;
    // console.log(students);
    chiz();
  },
  error:function(error){
    xatolik=error;
    alert("Uzr xatolik ro'y berdi ")
  }
  
});
};
getAllStudents();


// query POST to backend

const addStudent=student=>{
  $.ajax({
  url:"https://studentcrudforlesson.herokuapp.com/api/student/add",
  method:'post',
  data:JSON.stringify({firstname:`${student.f_name}`,lastname:`${student.l_name}`,username:`${student.u_name}`,phoneNumber:`${student.phone}`}),
  contentType:"application/json; charset-utf-8",
  dataType:"json",
  success:function(response){
    alert("Muvaffaqiyatli amalga oshirildi!")
    getAllStudents();
  },
  error:function(error){
    console.log(error);
    // alert(error)
    getAllStudents();
  }
});
};



$('button').on('click',()=>{
  let form=document.forms['myForm']
  let f_name=document.forms['myForm']['firstname'].value
  let l_name=document.forms['myForm']['lastname'].value
  let u_name=document.forms['myForm']['username'].value
  let phone=document.forms['myForm']['phoneNumber'].value
  let student={
    f_name:f_name,
    l_name:l_name,
    u_name:u_name,
    phone:phone
  }
  addStudent(student);
  form.reset();
});

const chiz=()=>{
  let myText="";
  students.forEach((student, index) => {
    myText +=`<tr>
    <th scope="row">${index+1} </th>
    <td>${student.firstname}</td>
    <td>${student.lastname}</td>
    <td>${student.username}</td>
    <td>${student.phoneNumber}</td>
    <td><span class="me-3"><img class="editImage"  onclick="editStudent(${student.id})" src="images/edit.png"/ alt="editStudent"></span><img src="images/delete.png" class="deleteImage" onclick="deleteStudent(${student.id})"  alt="delete"/> </td>
    </tr>`
  });
  $('.tableBody').html(myText);
};

const deleteStudent=(s_id)=>{
  $.ajax({
    url:`https://studentcrudforlesson.herokuapp.com/api/student/delete/${s_id}`,
    method:"delete",
    success:function(response){
      console.log("o'chirildi");
      getAllStudents();
    },
    error:function(error){
      console.log("xatolik bo'ldi");
      getAllStudents();
    }
  })

};

const editStudent=(s_id)=>{
  let student=students.find(item=>item.id===s_id)  // shu joyini tushiunmadim
  currentId=s_id;
  $('#firstname').val(student.firstname);
  $('#lastname').val(student.lastname);
  $('#username').val(student.username);
  $('#phone').val(student.phoneNumber)

  $('.delete').css("display","none")
  $('.edit').css("display","inline")

};
const updateStudent=(student)=>{
  $.ajax({
    url:`https://studentcrudforlesson.herokuapp.com/api/student/update/${currentId}`,
    method:"post",
    data:JSON.stringify({firstname:`${student.f_name}`,lastname:`${student.l_name}`,username:`${student.u_name}`,phoneNumber:`${student.phone}`}),
    contentType:"application/json; charset-utf-8",
    dataType:"json",
    success:function(javob){
      console.log("o'zgartirildi");
      getAllStudents();
    },
    error:function(){
      console.log("nimadir xato bo'libdi");
      getAllStudents();
    }

  })

}

const saveEdit=()=>{
  let student={
    f_name:$('#firstname').val(),
    l_name:$('#lastname').val(),
    u_name:$('#username').val(),
    phone:$('#phone').val()
  }
  updateStudent(student);
  $('#firstname').val("");
  $('#lastname').val("");
  $('#username').val("");
  $('#phone').val("")
  $('.delete').css("display","inline")
  $('.edit').css("display","none")
}



