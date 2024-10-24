export type Face = {
    bgColor: string,
    value: string | number | HTMLElement
}

export type Faces = {
    front: Face,
    left: Face, 
    right: Face, 
    back: Face,
    top: Face,
    bottom: Face
}

export type CubeData = {
    size: CubeSize,
    faces: Faces
}

export type CubeSize = {
    width: number,
    height: number,
}