import Image from 'next/image'

export function MacBook() {
  return (
    <div className="w-full [perspective:2000px]">
      <div className="[transform:rotateX(6deg)] [transform-style:preserve-3d]">
        {/* Screen / lid */}
        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="relative rounded-t-[18px] rounded-b-[6px] bg-gradient-to-b from-[#2a2f3a] to-[#15181f] p-[10px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            {/* inner bezel */}
            <div className="relative overflow-hidden rounded-[10px] bg-black ring-1 ring-black/60">
              {/* notch */}
              <div className="absolute left-1/2 top-0 z-20 h-[14px] w-[90px] -translate-x-1/2 rounded-b-[8px] bg-black" />
              {/* screen content */}
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/screens/crm-dashboard.png"
                  alt="CRM-дашборд, созданный AESBAU Labs"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 540px"
                  className="object-cover"
                />
                {/* screen glare */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />
              </div>
            </div>
          </div>
        </div>

        {/* Base / deck */}
        <div className="relative mx-auto w-full max-w-[600px]">
          {/* hinge */}
          <div className="mx-auto h-[6px] w-[calc(90%)] rounded-b-[4px] bg-gradient-to-b from-[#1a1d24] to-[#0d0f14]" />
          <div className="relative h-[14px] w-full rounded-b-[16px] bg-gradient-to-b from-[#c7ccd4] via-[#9aa0aa] to-[#6e747e] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)]">
            {/* front notch (opening lip) */}
            <div className="absolute left-1/2 top-0 h-[6px] w-[80px] -translate-x-1/2 rounded-b-[6px] bg-[#5a6069]/70" />
            {/* side reflections */}
            <div className="absolute inset-y-0 left-0 w-8 rounded-bl-[16px] bg-gradient-to-r from-white/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 rounded-br-[16px] bg-gradient-to-l from-white/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* soft ground shadow */}
      <div className="mx-auto mt-2 h-10 w-[70%] rounded-[50%] bg-black/50 blur-2xl" />
    </div>
  )
}
