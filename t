<!-- <script tpye = "text/javascript">
        let v = new Zplane(400,400);

        v.plot_axis();
        {% if (points[0][0] == None or points[0][1] == None) %}
        v.add_point( {{points[0]}} ,v.types.nonConjZero)
        {% endif %}

        {% if (points[1][0]== None or points[1][1]== None) %}
        v.add_point({{points[1]}},v.types.conjZero)
        {% endif %}

        // {% if (points[2][0] or points[2][1]) %}
        // v.add_point({{points[2]}},v.types.nonConjPole)
        // {% endif %}

        // {% if (points[3][0] or points[3][1]) %}
        // v.add_point({{points[3]}},v.types.conjPole)
        // {% endif %}

        console.log(v.dataSet)
        
    </script> -->


         <form method="POST">
        {{ form_2.hidden_tag() }}
    
        <div class="row mb-3">
    
        {{form_2.zero.label(class="col-sm-3 col-form-label")}}
    
          <div class="col-sm-10">
    
            {{ form_2.zero() }}
    
            </div>
            </div>

            <div class="row mb-3">

                {{form_2.conj_zero.label(class="col-sm-3 col-form-label")}}
            
                    <div class="col-sm-10">
            
                    {{ form_2.conj_zero() }}
            
                    </div>
                    </div>

            <div class="row mb-3">

                {{form_2.pole.label(class="col-sm-3 col-form-label")}}
            
                    <div class="col-sm-10">
            
                    {{ form_2.pole() }}
            
                    </div>
                    </div>
            
    
            <div class="row mb-3">
    
            {{form_2.conj_pole.label(class="col-sm-3 col-form-label")}}
        
                <div class="col-sm-10">
        
                {{ form_2.conj_pole() }}
        
                </div>
                </div>
    
                <br>
                {{ form_2.add( class="btn btn-outline-primary btn-color") }}
    
    </form>
