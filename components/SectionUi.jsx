"use client";

export default function SectionUi() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Design assessments that capture quality, rich evidence of
                student learning
              </h2>

              <p className="mt-4 text-gray-700">
                AI COURSE GENERATOR helps you generate interactive activities
                that encourage collaboration, critical thinking, deeper
                understanding, and rich evidence of learning through
                project-based activities, interactive chapters, and more!
              </p>
            </div>
          </div>

          <div>
            <img src="examplettt" className="rounded" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
