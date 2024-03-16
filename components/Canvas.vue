<template>
  <div class="flex bloc items-center">
    <label for="signature" class="block text-sm font-medium text-gray-700">사인하기(필수)</label>
    <button @click="resetCanvas" class="ml-4 py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70  rounded-lg">다시쓰기</button>
  </div>
  <div class="flex justify-center mt-3">
    <canvas ref="canvas" id='drawing-pad' width='300' height='200' class="border-2 border-gray-300 ">
    </canvas>
</div>
</template>

<script>
import {state} from '@/stores/index';
export default {
   emits: ['canvasUrl'],
  /* eslint-disable */
    data(){
        return{
        canvas: null,
        context: null,
        isDrawing: false,
        startX: 0,
        startY: 0,
        points: [],
        dataUrl: null,
        }
    },
    mounted(){
        var vm = this
        vm.canvas = vm.$refs.canvas
        vm.context = vm.canvas.getContext("2d");
        vm.canvas.addEventListener('mousedown', vm.mousedown);
        vm.canvas.addEventListener('mousemove', vm.mousemove)
        vm.canvas.addEventListener('mouseup', vm.mouseup);

        vm.canvas.addEventListener('touchstart', vm.touchstart);
        vm.canvas.addEventListener('touchmove', vm.touchmove)
        vm.canvas.addEventListener('touchend', vm.touchend);
        
    },
    watch: {
      dataUrl() {
        this.$emit('canvasUrl', this.dataUrl)
      }
      
    },

    methods:{
        mousedown(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        vm.isDrawing = true;
        vm.startX = x;
        vm.startY = y;
        vm.points.push({
            x: x,
            y: y
        });
        },
        mousemove(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (vm.isDrawing) {
        vm.context.beginPath();
        vm.context.moveTo(vm.startX, vm.startY);
        vm.context.lineTo(x, y);
        vm.context.lineWidth = 1;
        vm.context.lineCap = 'round';
        vm.context.strokeStyle = "rgba(0,0,0,1)";
        vm.context.stroke();
        
        vm.startX = x;
        vm.startY = y;  
        
        vm.points.push({
          x: x,
          y: y
          });
        }
      },
        mouseup(e){
            var vm = this
            vm.isDrawing = false;
            if (vm.points.length > 0) {
                localStorage['points'] = JSON.stringify(vm.points);    
            }
             vm.dataUrl = vm.canvas.toDataURL();
    
        },



    touchstart(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x =  e.touches[0].clientX  - rect.left;
        var y = e.touches[0].clientY - rect.top;
        
        vm.isDrawing = true;
        vm.startX = x;
        vm.startY = y;
        vm.points.push({
            x: x,
            y: y
        });
        e.preventDefault();
        },
        touchmove(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x = e.touches[0].clientX  - rect.left;
        var y = e.touches[0].clientY - rect.top;

        if (vm.isDrawing) {
        vm.context.beginPath();
        vm.context.moveTo(vm.startX, vm.startY);
        vm.context.lineTo(x, y);
        vm.context.lineWidth = 1;
        vm.context.lineCap = 'round';
        vm.context.strokeStyle = "rgba(0,0,0,1)";
        vm.context.stroke();
        
        vm.startX = x;
        vm.startY = y;  
        
        vm.points.push({
          x: x,
          y: y
          });
        }
        e.preventDefault();
      },
        touchend(e){
            var vm = this
            vm.isDrawing = false;
            if (vm.points.length > 0) {
                localStorage['points'] = JSON.stringify(vm.points);    
            }
             vm.dataUrl = vm.canvas.toDataURL();
         

        },

        resetCanvas(){
          var vm = this
          vm.canvas.width = vm.canvas.width;
          vm.points.length = 0; // reset points array
          vm.dataUrl = '';
        },
  }
    }
</script>

<style>

</style>