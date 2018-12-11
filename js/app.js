function format_money(value){
    var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formatter.format(value); 
};

$(document).ready(function () {
    var counter = 0;
    var prices = {
        11: {
            16: 1.90,
            17: 1.70,
            18: 0.90
        }, 
        16: {
            11: 2.90
        },
        17: {
            11: 2.70
        },
        18: {
            11: 1.90
        }
    }

    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";
        cols += '<td> <select class="form-control" name="source"> <option value="">Selecione a Origem</option> <option value="11">011</option> <option value="16">016</option> <option value="17">017</option> <option value="18">018</option> </select> </td><td> <select class="form-control" name="destino"> <option value="">Selecione o Destino</option> <option value="11">011</option> <option value="16">016</option> <option value="17">017</option> <option value="18">018</option> </select> </td><td> <input type="text" name="time" class="form-control"/> </td><td> <select class="form-control" name="plano"> <option value="">Selecione o Plano</option> <option value="30">FaleMais 30</option> <option value="60">FaleMais 60</option> <option value="120">FaleMais 120</option> </select> </td><td> <span class="with_plano"></span> </td><td> <span class="without_plano"></span> </td>';
        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
        newRow.append(cols);
        $("table.order-list").append(newRow);
        counter++;
    });

    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();       
        counter -= 1
    });

    
     $("table.order-list").on("change", "input, select", function(){
       
       var row = $(this).parents('tr');
       var source = $("[name='source']", row).val(),
           destino = $("[name='destino']", row).val(),
           time = $("[name='time']", row).val(),
           plano = $("[name='plano']", row).val();
           
        var with_plano = $(".with_plano", row),
            without_plano = $(".without_plano", row);
       
       if (source && destino && time && plano){
           
            var value_price = prices[source][destino],
                calc_time = time - plano,
                txt = "";
        
            if (!value_price){
                alert("Combinação invalida. tente de novo");
                with_plano.text("");
                without_plano.text("");
                return 
            }
        
           if (calc_time > 1 ){
               txt = calc_time * (value_price * 1.10);
           }else{
               txt = 0.0
           }
           
           with_plano.text(format_money(txt));
           without_plano.text(
               format_money((value_price * time))
           );
           
           
       }else{
          with_plano.text("");
          without_plano.text("");
       }
    });
});
