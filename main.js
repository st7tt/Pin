var Pins = AV.Object.extend("Pins");
var LocationLocal = AV.Object.extend("LocatinLocal");
var Chat = AV.Object.extend("Chat")
var appId ="";
var firstFlag = true;
function NewPin(var title,var type,var content，var longitude,var latitude){
   var user = AV.User.current();
   if (!user) {
     return [401,"用户没有登录，没有权限创建Pin",""];
   }
   if(!title){
     return [204,"新Pin内容为空，什么都没有",""];
   }else if(title.length>255){
     return[400,"标题格式错误",""];
   }
   if(!content){
     return [204,"新Pin内容为空，什么都没有",""];
   }else if(content.length>1024){
     return[400,"标题格式错误",""];
   }
   if(!type){
     return [204,"类型为空",""]
   }else if(type.length>8){
     return [400,"类型格式错误",""];
   }
   if(longitude && latitude){
     return (204,"经纬度为空","")
   }else{
     lgt = toString(longitude);
     ltt = toString(latitude);
     if(lgt.length>24||ltt>24){
       return [400,"经纬度格式错误",""];
     }
   }
   var pin = new Pins();
   var location = new LocationLocal();
   var id = null;
   var pins = AV.Query(Pins));
   var num = 1;
   var i=0;
   do{
     if(!pins.id){
       id = i;
       break;
     }
     i++;
   }while(pins->next);
   var date = new Date();
   var time= date.toLocalString();
   location.set("longitude",longitude);
   location.set("latitude",latitude);
   pin.set("id",id);
   pin.set("content",content);
   pin.set("title"，title);
   pin.set("location",location);
   pin.set("date",time);
   pin.set("numPep",num)
   pin.save(null,{
     success:function(pin){
       var roomObj;
       conn = AV.realtime({
         appId: appId,
         clientId: user.id,
         encodeHTML: true,
          });
       conn.on('open',function(){
         firstFlag = false ;
         room = conn.conv({
           members:['userId'];
           name: pin.title + pin.content + pin.time ;
         });
       });
       return [200,"成功建立一个Pin",id];
     error:function(){
       return [500,"存储信息有误，重新发送"]
     }
   });
}
function GetEnvironment(var longitude ,var latitude){
  if(longitude && latitude){
    return [204,"经纬度为空"]
  }else{
    lgt = toString(longitude);
    ltt = toString(latitude);
    if(lgt.length>24||ltt>24){
      return [400,"经纬度格式错误"];
    }
  }
  var pins = AV.Query(Pins));
  var point = new AV.GeoPoint({latitude:lattitude,longitude:longitude});
  pins.near("location",point);
  pins.withinKilometers(1000);
  pins.find({
    success:function(pins){
      return [200,"获取成功",pins];
    error:function(){
      return [500，"获取失败请重新发送"]
    }
    }
  });
}
function SendChat(var type,var content,var pinID){
  if(!type){
    return [204,"类型为空"];
  }else if(type.length>8){
    return [400,"类型格式错误"];
  }
  if(!content){
    return [204,"新Pin内容为空，什么都没有",""];
  }else if(content.length>1024){
    return[400,"标题格式错误",""];
  }
  if(firstFlag){
     if (firstFlag) {
        alert('请先连接服务器！');
        return;
        }
     room.senD(content,{type:type});
  }
  var pin =AV.Query("Pins");
  var chat = new chat();
  var date = new Date();
  var time= date.toLocalString();
  var user = AV.User.current();
  chat.set("type",type);
  chat.set("content",content);
  chat.set("date",time);
  chat.set("sender",user.id)
  pin.equalTo("id",pinId);
  pin.find({
    success:function(pin){
       pin.set("chat".chat);
       pin.save();
    }
  });
  var date = {
    content:content,
    userId:user.id,
    username:user.name,
    time:time,
    type:type,
  }
  if(firstFlag){
     if (firstFlag) {
        alert('请先连接服务器！');
        return ;
        }
     room.send(date,{type:type});
  }
  return [200,"已成功发送一条信息"];
}
function enterRoom(var pinID){
  var pin = AV.Query("Pins");
  pin.equalTo("id",pinID);
  pin.find({
    success:function(pin){
      conn = AV.realtime({
      appId: appId,
      clientId: clientId,
      });
      roomId = pin.title + pin.content + pin.time ;
      conn.on('open', function(){
        if(firstFlat){
          alert("服务器未连接");
          return;
        }
        room=conn.room(roomid,function(room){
          if(romm){
            room.list(function(data){
              pin.set("numPep",date.length)
              if(date.length>200){
                alert("当前Pin已经满人,请选择其余Pin");
              }
            }
            room.join(function(){
              return [200,"成功进入Pin"];
            });
          }
         else{
            return[500,"无当前Pin，请重新选择"] ;
         }
        });
      }
    });
  }
}
function OutPin(var pinID){
  var pin = AV.Query("Pins");
  pin.equalTo("id",pinID);
  var user = AV.User.current():
  pin.find({
    success:function(pin){
      conn.on('open', function(){
        if(firstFlat){
          alert("服务器未连接");
          return;
        }
        roomId = pin.title + pin.content + pin.time;
        room=conn.room(roomid,function(room){
          if(romm){
            room.remove(user.id);
            return [200,"退出成功"];
          }
      });
    }
  });
}
function RequestContent(var requestID){

}
