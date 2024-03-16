<template>
  <!-- 개인약관동의 확인 버튼 클릭시에 나와야 하는 팝업 -->
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <!--
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div>
            
            <div class="mt-3 text-center sm:mt-5">
              <strong>자유통일당 개인정보 처리방침</strong><br />
                자유통일당매체사명 (이하 ‘회사’라 한다)는(은) 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립 · 공개합니다. 회사는 개인정보취급방침을 개정하는 경우 회사 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
                <br /><br />
                <strong> 개인정보의 처리목적</strong><br />
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                ① 홈페이지 회원 가입 및 관리<br />
                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별 · 인증, 회원자격 유지 · 관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의여부 확인, 각종 고지 · 통지, 고충처리 등을 목적으로 개인정보를 처리합니다.
                <br />
                ② 재화 또는 서비스 제공<br />
                물품배송, 서비스 제공, 계약서 · 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제 · 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.
                <br />
                ③ 고충처리<br />
                민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락 · 통지, 처리결과 통보 등의 목적으로 개인정보를 처리합니다.<br />
                처리하는 개인정보 항목<br />
                회사는 다음의 개인정보 항목을 처리하고 있습니다.<br /><br />
                
                ① 홈페이지 회원 가입 및 관리<br />
                - 필수항목 : 성명, 생년월일, 아이디, 비밀번호, 성별, 이메일주소, 닉네임<br />
                - 선택항목 : 주소, 전화번호, 프로필사진<br /><br />
                ② 재화 또는 서비스 제공 시<br />
                - 필수항목 : 성명, 생년월일, 아이디, 비밀번호, 주소, 전화번호, 이메일주소, 아이핀번호, 신용카드번호, 은행계좌정보 등 결제에 필요한 정보<br /><br />
                ③ 인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.<br />
                - IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등<br /><br />
                <strong> 개인정보의 처리 및 보유기간</strong><br />
                ① 회사는 법령에 따른 개인정보 보유 · 이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유 · 이용기간 내에서 개인정보를 처리 · 보유합니다.<br />
                ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br />
                1. 홈페이지 회원 가입 및 관리 : 홈페이지 탈퇴 시까지<br />
                다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지<br />
                1 관계 법령 위반에 따른 수사․조사 등이 진행중인 경우에는 해당 수사 · 조사 종료 시까지<br />
                2 홈페이지 이용에 따른 채권 · 채무관계 잔존 시에는 해당 채권 · 채무관계 정산 시까지<br />
                2. 재화 또는 서비스 제공 : 재화․서비스 공급완료 및 요금결제․정산 완료 시까지<br />
                다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지<br />
                1 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시․광고, 계약내용 및 이행 등 거래에 관한 기록<br />
                - 표시 · 광고에 관한 기록 : 6월<br />
                - 계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년<br />
                - 소비자 불만 또는 분쟁처리에 관한 기록 : 3년<br />
                2 「통신비밀보호법」제41조에 따른 통신사실확인자료 보관<br />
                - 가입자 전기통신일시, 개시․종료시간, 상대방 가입자번호, 사용도수, 발신기지국 위치추적자료 : 1년<br />
                - 컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button type="button" @click="$emit('close')"
            class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style>

</style>