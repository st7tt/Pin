var Pins = AV.Object.extend("Pins");
var LocationLocal = AV.Object.extend("LocatinLocal");
var appId ="";
function New Pin(var title,var type,var content，var longitude,var latitude){
   var user = AV.User.current();
   if (!user) {
     return [401,"用户没有登录，没有权限创建Pin",""];
   }
   if(!content){
     return [204,"新Pin内容为空，什么都没有",""];
   }else if(title.length>255){
     return[400,"标题格式错误",""];
   }
   if(!type){
     return [204,"类型为空",""]
   }else if(type%100>1){
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
   var pin = new Pins;
   var location = new LocationLocal;
   var id = null;
   var pins = AV.Query(Pins));
   var list[] = pins.select("pins.id");
   for(row in list){
      if (id is null){
        id = list[row].id;
      }
      else{
      id = id + 1;
      }
   }
   var date = new Date();
   var time= date.toLocalString();
   location.set("longitude",longitude);
   location.set("latitude",latitude);
   pin.set("id",id);
   pin.set("content",content);
   pin.set("title"，title);
   pin.set("location",location);
   pin.set("date",time);
   pin.save(null,{
     success:function(pin){
       return [200,"成功建立一个Pin",id];
       var roomObj;
       roomObj = AV.realtime({
         appId: appId,
         userid: user.id,
          // 是否开启 HTML 转义，SDK 层面开启防御 XS
         encodeHTML: true,
          // 是否开启服务器端认证
          // auth: authFun
          });
       roomObj.on('open',function(){
         chatObj = roomObj.conv({
           members:['userId'];
           name:title+content;
         })
       })
       realtimeObj.on('close', function() {
         console.log('实时通信服务被断开！');
       });
       realtimeObj.on('reuse', function() {
         console.log('正在重新连接。。。');
       });
     }
     error:function(){
       return [500,"存储信息有误，重新发送"，""]
     }
   })
}
function GetEnvironment(){
  if(longitude && latitude){
    return (204,"经纬度为空","")
  }else{
    lgt = toString(longitude);
    ltt = toString(latitude);
    if(lgt.length>24||ltt>24){
      return [400,"经纬度格式错误",""];
    }
  }
  var pins = AV.Query(Pins));
  var pin =new Array();
  var list[] = pins.select("location");
  for(i in list){
    var lonA = list[i].longitude;
    var lonB = longitude;
    var latA = list[i].latitude;
    var latB = latitude;
    var diatance = 63710040*Math.arccos(Math.sin(latA)*Math.sin(latB)*Math.cos(lonA-lonB)+Math.cos(latA)*Math.cos(latB))*Math.Pi/180;
    if(distance<=1000){
      pins.equalTo("location",list[i]);
      pins.first({
        success:function(object){
          pin.push(object);
        }
        error:function(error){
          return error.code;
        }
      })
    }
  }
  return pin ;
}
