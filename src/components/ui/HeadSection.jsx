
function HeadSection({text}) {
    return (
        <div className="mb-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-(--head-sec-color) inline-block relative">
            {text}
            <span className="absolute bg-(--primary-color)/20 rounded-full -bottom-1 h-3 w-full right-0"></span>
          </h2>
        </div>
    )
}

export default HeadSection
