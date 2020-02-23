import Plane from '../math/Plane'

// 碰撞检测

const Collision = function(ObjectItems) {

}

// static
Collision.prototype.isOverlapped = Collision.isOverlapped = function(itemA, itemB) {
  const planeA = new Plane(itemA.getBody())
  const planeB = new Plane(itemB.getBody())

  Plane.isCrossed(planeA, planeB)
}
