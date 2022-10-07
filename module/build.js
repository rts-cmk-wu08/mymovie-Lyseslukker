export const build = (component, className, appendTo, innerText, componentIndex) => {
    // console.log(component + "," + className + "," + appendTo + "," + innerText + "," + componentIndex)


    if (componentIndex !== undefined) {
        const element = document.querySelectorAll(appendTo)

        const build = document.createElement(component)
        build.classList.add(className)
        if (innerText !== undefined) {
            build.innerHTML = innerText
            element[componentIndex].append(build)
        }
        element[componentIndex].append(build)
        return build
    }
    else {
        const element = document.querySelector(appendTo)

        const build = document.createElement(component)
        build.classList.add(className)
        if (innerText !== undefined) {
            build.innerHTML = innerText
            element.append(build)
        }
        element.append(build)
        return build
    }
}