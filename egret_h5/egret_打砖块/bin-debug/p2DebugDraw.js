var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var p2DebugDraw = (function () {
    function p2DebugDraw(world, sprite) {
        this.COLOR_D_SLEEP = 0x999999;
        this.COLOR_D_WAKE = 0xe5b2b2;
        this.COLOR_K = 0x7f7fe5;
        this.COLOR_S = 0x7fe57f;
        this.COLOR_BLACK = 0x000000;
        this.COLOR_RED = 0xff0000;
        this.isDrawAABB = false;
        this.factor = 30;
        this.world = world;
        this.sprite = sprite;
    }
    p2DebugDraw.prototype.drawDebug = function () {
        this.sprite.graphics.clear();
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var body = this.world.bodies[i];
            for (var j = 0; j < body.shapes.length; j++) {
                var shape = body.shapes[j];
                this.drawShape(shape, body);
                if (this.isDrawAABB)
                    this.drawAABB(body);
            }
        }
        l = this.world.constraints.length;
        var jointType, joint;
        for (var j = 0; j < l; j++) {
            joint = this.world.constraints[j];
            switch (joint.type) {
                case p2.Constraint.DISTANCE:
                    this.drawDistanceJoint(joint);
                    break;
                case p2.Constraint.REVOLUTE:
                    this.drawRevoluteJoint(joint);
                    break;
                case p2.Constraint.GEAR:
                    this.drawGearJoint(joint);
                    break;
                case p2.Constraint.PRISMATIC:
                    this.drawPrismaticJoint(joint);
                    break;
                case p2.Constraint.LOCK:
                    this.drawLockJoint(joint);
                    break;
            }
        }
        l = this.world.springs.length;
        var springType, spring;
        for (var s = 0; s < l; s++) {
            spring = this.world.springs[s];
            if (spring instanceof p2.LinearSpring) {
                this.drawLinearSpring(spring);
            }
            else if (spring instanceof p2.RotationalSpring) {
                this.drawRotationalSpring(spring);
            }
        }
    };
    p2DebugDraw.prototype.drawAABB = function (body) {
        var vertices = new Array();
        var lx = body.aabb.lowerBound[0];
        var ly = body.aabb.lowerBound[1];
        var ux = body.aabb.upperBound[0];
        var uy = body.aabb.upperBound[1];
        if (isFinite(lx) && isFinite(ly) && isFinite(ux) && isFinite(uy)) {
            vertices.push([lx, ly], [ux, ly], [ux, uy], [lx, uy]);
            this.drawConvex(vertices, this.COLOR_S, 1, false);
        }
    };
    p2DebugDraw.prototype.drawDistanceJoint = function (joint) {
        var pA = new Array(), pB = new Array(), distance;
        distance = joint.distance;
        if (joint.upperLimitEnabled && joint.upperLimit > distance)
            distance = joint.upperLimit;
        joint.bodyA.toWorldFrame(pA, joint.localAnchorA);
        joint.bodyB.toWorldFrame(pB, joint.localAnchorB);
        var segment = p2.vec2.subtract([], pB, pA);
        p2.vec2.normalize(segment, segment);
        p2.vec2.scale(segment, segment, distance);
        var anchorB = p2.vec2.add([], pA, segment);
        this.drawSegment(pA, joint.bodyA.position, this.COLOR_S);
        this.drawSegment(pB, joint.bodyB.position, this.COLOR_S);
        this.drawVecAt(segment, pA, this.COLOR_BLACK);
        //draw maxfore
        if (joint.position > distance)
            this.drawSegment(pB, anchorB, this.COLOR_RED);
        //draw anchorA
        this.drawCircle(pA, 3 / this.factor, this.COLOR_BLACK);
        //draw upperlimit, which is also anchorB
        this.drawCircle(anchorB, 3 / this.factor, this.COLOR_BLACK);
        //draw lowerlimit
        if (joint.lowerLimitEnabled) {
            p2.vec2.normalize(segment, segment);
            p2.vec2.scale(segment, segment, joint.lowerLimit);
            anchorB = p2.vec2.add([], pA, segment);
            this.drawCircle(anchorB, 2 / this.factor, this.COLOR_BLACK);
        }
    };
    p2DebugDraw.prototype.drawRevoluteJoint = function (joint) {
        var anchorA = new Array(), anchorB = new Array();
        joint.bodyA.toWorldFrame(anchorA, joint.pivotA);
        joint.bodyB.toWorldFrame(anchorB, joint.pivotB);
        this.drawSegment(joint.bodyA.position, anchorA, this.COLOR_S);
        this.drawSegment(joint.bodyB.position, anchorB, this.COLOR_S);
        this.drawSegment(anchorA, anchorB, this.COLOR_RED);
        this.drawCircle(anchorA, 3 / this.factor, this.COLOR_BLACK);
    };
    p2DebugDraw.prototype.drawGearJoint = function (joint) {
        var pA = joint.bodyA.position;
        var pB = joint.bodyB.position;
        var pA1 = new Array(), pB1 = new Array();
        joint.bodyA.toWorldFrame(pA1, [20 / this.factor, 0]);
        joint.bodyB.toWorldFrame(pB1, [20 / this.factor, 0]);
        var v1 = p2.vec2.subtract([], pA, pA1);
        var v2 = p2.vec2.subtract([], pB, pB1);
        this.drawVecAt(v1, pA, this.COLOR_BLACK, true);
        this.drawVecAt(v2, pB, this.COLOR_BLACK, true);
        joint.bodyB.toWorldFrame(v2, [10 * (joint.bodyB.angle - joint.bodyA.angle - joint.angle) / this.factor, 0]);
        this.drawSegment(v2, pB, this.COLOR_RED);
    };
    p2DebugDraw.prototype.drawPrismaticJoint = function (joint) {
        var pA = joint.bodyA.position;
        var pB = joint.bodyB.position;
        var anchorA = new Array(), anchorB = new Array();
        joint.bodyA.toWorldFrame(anchorA, joint.localAnchorA);
        joint.bodyB.toWorldFrame(anchorB, joint.localAnchorB);
        var axis = new Array();
        axis = this.toWorldVector(joint.localAxisA, joint.bodyA);
        var lowerAxis = p2.vec2.copy([], axis);
        var upperAxis = p2.vec2.copy([], axis);
        if (joint.lowerLimitEnabled) {
            p2.vec2.scale(lowerAxis, axis, joint.lowerLimit);
        }
        else {
            p2.vec2.scale(lowerAxis, axis, 5000);
        }
        if (joint.upperLimitEnabled) {
            p2.vec2.scale(upperAxis, axis, joint.upperLimit);
        }
        else {
            p2.vec2.scale(upperAxis, axis, 5000);
        }
        this.drawVecAt(lowerAxis, anchorA, this.COLOR_BLACK, true);
        this.drawVecAt(upperAxis, anchorA, this.COLOR_BLACK, true);
        p2.vec2.add(lowerAxis, lowerAxis, anchorA);
        this.drawCircle(lowerAxis, 2 / this.factor, this.COLOR_BLACK, 1, true);
        p2.vec2.add(upperAxis, upperAxis, anchorA);
        this.drawCircle(upperAxis, 2 / this.factor, this.COLOR_BLACK, 1, true);
    };
    p2DebugDraw.prototype.drawLockJoint = function (joint) {
        var offset = new Array(), pB = new Array();
        joint.bodyA.toWorldFrame(offset, joint.localOffsetB);
        this.drawSegment(offset, joint.bodyA.position, this.COLOR_S);
        this.drawSegment(offset, joint.bodyB.position, this.COLOR_RED);
        this.drawCircle(offset, 3 / this.factor, this.COLOR_BLACK);
        var angleIndicator = new Array();
        joint.bodyA.toWorldFrame(angleIndicator, [20 / this.factor, 0]);
        this.drawSegment(angleIndicator, joint.bodyA.position, this.COLOR_BLACK);
        joint.bodyB.toWorldFrame(angleIndicator, [20 / this.factor, 0]);
        this.drawSegment(angleIndicator, joint.bodyB.position, this.COLOR_BLACK);
    };
    p2DebugDraw.prototype.drawLinearSpring = function (spring) {
        var pA = new Array(), pB = new Array();
        spring.bodyA.toWorldFrame(pA, spring.localAnchorA);
        spring.bodyB.toWorldFrame(pB, spring.localAnchorB);
        var segment = p2.vec2.subtract([], pB, pA);
        p2.vec2.normalize(segment, segment);
        p2.vec2.scale(segment, segment, spring.restLength);
        var anchorB = p2.vec2.add([], spring.bodyA.position, segment);
        this.drawSegment(anchorB, spring.bodyB.position, this.COLOR_RED);
        this.drawVecAt(segment, pA, this.COLOR_BLACK);
        this.drawCircle(pA, 3 / this.factor, this.COLOR_RED);
        this.drawCircle(anchorB, 3 / this.factor, this.COLOR_RED);
    };
    p2DebugDraw.prototype.drawRotationalSpring = function (spring) {
        var pA = new Array(), pB = new Array();
        pA = spring.bodyA.position;
        pB = spring.bodyB.position;
        var pA1 = new Array(), pB1 = new Array();
        spring.bodyA.toWorldFrame(pA1, [20 / this.factor, 0]);
        spring.bodyB.toWorldFrame(pB1, [10 * (spring.bodyB.angle - spring.bodyA.angle - spring.restAngle + 2) / this.factor, 0]);
        var v1 = p2.vec2.subtract([], pA1, pA);
        var v2 = p2.vec2.subtract([], pB1, pB);
        this.drawVecAt(v1, pA, this.COLOR_RED, true);
        this.drawVecAt(v2, pB, this.COLOR_RED, true);
        spring.bodyB.toWorldFrame(pB1, [20 / this.factor, 0]);
        this.drawCircle(pA1, 2 / this.factor, this.COLOR_RED);
        this.drawCircle(pB1, 2 / this.factor, this.COLOR_RED);
    };
    p2DebugDraw.prototype.drawShape = function (shape, body, color, fillColor) {
        var color = color == undefined ? this.getColor(body) : color;
        var fillColor = fillColor == undefined ? true : fillColor;
        if (shape instanceof p2.Convex) {
            this.drawConvexShape(shape, body, color, fillColor);
        }
        else if (shape instanceof p2.Plane) {
            this.drawPlaneShape(shape, body, color, fillColor);
        }
        else if (shape instanceof p2.Circle) {
            this.drawCircleShape(shape, body, color, fillColor);
        }
        else if (shape instanceof p2.Capsule) {
            this.drawCapsule(shape, body, color);
        }
        else if (shape instanceof p2.Particle) {
            this.drawParticle(shape, body, color);
        }
        else if (shape instanceof p2.Line) {
            this.drawLine(shape, body, color);
        }
        else if (shape instanceof p2.Heightfield) {
            this.drawHeightfeild(shape, body, color);
        }
    };
    p2DebugDraw.prototype.drawConvexShape = function (shape, b, color, fillColor) {
        var indexofShape = b.shapes.indexOf(shape);
        var offset = shape.position;
        var angle = shape.angle;
        var shapeCenter = [];
        var worldPoint = this.transformVec(shape.vertices[0], offset, angle);
        b.toWorldFrame(shapeCenter, offset);
        b.toWorldFrame(worldPoint, worldPoint);
        this.drawSegment(shapeCenter, worldPoint, color);
        var worldVertices = new Array();
        var l = shape.vertices.length;
        for (var i = 0; i < l; i++) {
            worldPoint = this.transformVec(shape.vertices[i], offset, angle);
            b.toWorldFrame(worldPoint, worldPoint);
            worldVertices.push(worldPoint);
        }
        //console.log(worldVertices[0]);
        this.drawConvex(worldVertices, color, 0.5, fillColor);
    };
    p2DebugDraw.prototype.drawParticle = function (shape, b, color) {
        this.drawCircle(b.position, 1 / this.factor, color, 0.5);
        this.drawCircle(b.position, 5 / this.factor, color, 1, false);
    };
    p2DebugDraw.prototype.drawLine = function (shape, b, color) {
        var len = shape.length;
        var p1 = new Array(), p2 = new Array();
        b.toWorldFrame(p1, [-len / 2, 0]);
        b.toWorldFrame(p2, [len / 2, 0]);
        this.drawSegment(p1, p2, color);
    };
    p2DebugDraw.prototype.drawHeightfeild = function (shape, b, color) {
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        var data = shape.heights;
        var elementWidth = shape.elementWidth;
        var x;
        var worldPoint = new Array();
        var worldVertices = new Array();
        data.forEach(function (y, i) {
            x = i * elementWidth;
            worldPoint = new Array();
            b.toWorldFrame(worldPoint, [x, y]);
            worldVertices.push(worldPoint);
        });
        worldPoint = new Array();
        b.toWorldFrame(worldPoint, [x, -500]);
        worldVertices.push(worldPoint);
        worldPoint = new Array();
        b.toWorldFrame(worldPoint, [0, -500]);
        worldVertices.push(worldPoint);
        worldPoint = new Array();
        b.toWorldFrame(worldPoint, [0, 0]);
        worldVertices.push(worldPoint);
        this.drawConvex(worldVertices, color, 0.5);
    };
    p2DebugDraw.prototype.drawCapsule = function (shape, b, color) {
        var len = shape.length;
        var radius = shape.radius;
        var p1 = new Array(), p2 = new Array(), p3 = new Array(), p4 = new Array();
        var a1 = new Array(), a2 = new Array();
        b.toWorldFrame(p1, [-len / 2, -radius]);
        b.toWorldFrame(p2, [len / 2, -radius]);
        b.toWorldFrame(p3, [len / 2, radius]);
        b.toWorldFrame(p4, [-len / 2, radius]);
        b.toWorldFrame(a1, [len / 2, 0]);
        b.toWorldFrame(a2, [-len / 2, 0]);
        this.drawCircle(a1, radius, color, 0.5);
        this.drawCircle(a2, radius, color, 0.5);
        this.drawConvex([p1, p2, p3, p4], color, 0.5);
    };
    p2DebugDraw.prototype.drawCircleShape = function (shape, b, color, solid) {
        var offset = shape.position;
        var angle = shape.angle;
        var pos = new Array();
        b.toWorldFrame(pos, offset);
        this.drawCircle(pos, shape.radius, color, 0.5, solid);
        var edge = this.transformVec([shape.radius, 0], offset, angle);
        b.toWorldFrame(edge, edge);
        this.drawSegment(pos, edge, color);
    };
    p2DebugDraw.prototype.drawPlaneShape = function (shape, b, color, fillColor) {
        var worldPoint = new Array();
        var worldVertices = new Array();
        var i = b.shapes.indexOf(shape);
        b.toWorldFrame(worldPoint, [1000, 0]);
        worldPoint = this.transformVec(worldPoint, shape.position, shape.angle);
        worldVertices.push(worldPoint);
        worldPoint = new Array();
        b.toWorldFrame(worldPoint, [1000, -100000]);
        worldPoint = this.transformVec(worldPoint, shape.position, shape.angle);
        worldVertices.push(worldPoint);
        worldPoint = new Array();
        b.toWorldFrame(worldPoint, [-1000, -100000]);
        worldPoint = this.transformVec(worldPoint, shape.position, shape.angle);
        worldVertices.push(worldPoint);
        worldPoint = new Array();
        b.toWorldFrame(worldPoint, [-1000, 0]);
        worldPoint = this.transformVec(worldPoint, shape.position, shape.angle);
        worldVertices.push(worldPoint);
        this.drawConvex(worldVertices, color, 0.5, fillColor);
    };
    p2DebugDraw.prototype.getColor = function (b) {
        var color = this.COLOR_D_SLEEP;
        if (b.type == p2.Body.KINEMATIC) {
            color = this.COLOR_K;
        }
        else if (b.type == p2.Body.STATIC) {
            color = this.COLOR_S;
        }
        else if (b.sleepState == p2.Body.AWAKE) {
            color = this.COLOR_D_WAKE;
        }
        return color;
    };
    p2DebugDraw.prototype.drawVecAt = function (v, at, color, markStart) {
        if (markStart === void 0) { markStart = false; }
        var pa = p2.vec2.copy([], at);
        var pb = p2.vec2.add([], v, at);
        if (markStart)
            this.drawCircle(pa, 3 / this.factor, color);
        this.drawSegment(pa, pb, color);
    };
    p2DebugDraw.prototype.drawVecTo = function (v, to, color, markStart) {
        if (markStart === void 0) { markStart = false; }
        var pa = p2.vec2.copy([], to);
        var pb = p2.vec2.subtract([], to, v);
        if (markStart)
            this.drawCircle(pa, 3 / this.factor, color);
        this.drawSegment(pa, pb, color);
    };
    p2DebugDraw.prototype.drawSegment = function (start, end, color) {
        this.sprite.graphics.lineStyle(1, color);
        this.sprite.graphics.moveTo(start[0] * this.factor, start[1] * this.factor);
        this.sprite.graphics.lineTo(end[0] * this.factor, end[1] * this.factor);
    };
    p2DebugDraw.prototype.drawCircle = function (pos, radius, color, alpha, fillColor) {
        if (alpha === void 0) { alpha = 1; }
        this.sprite.graphics.lineStyle(1, color);
        if (fillColor || fillColor == undefined)
            this.sprite.graphics.beginFill(color, alpha);
        this.sprite.graphics.drawCircle(pos[0] * this.factor, pos[1] * this.factor, radius * this.factor);
        this.sprite.graphics.endFill();
    };
    p2DebugDraw.prototype.drawConvex = function (vertices, color, alpha, fillColor) {
        if (alpha === void 0) { alpha = 1; }
        if (fillColor === void 0) { fillColor = true; }
        this.sprite.graphics.lineStyle(1, color);
        if (fillColor)
            this.sprite.graphics.beginFill(color, alpha);
        var l = vertices.length;
        var worldPoint = vertices[0];
        this.sprite.graphics.moveTo(worldPoint[0] * this.factor, worldPoint[1] * this.factor);
        for (var i = 1; i <= l; i++) {
            worldPoint = vertices[i % l];
            this.sprite.graphics.lineTo(worldPoint[0] * this.factor, worldPoint[1] * this.factor);
        }
        this.sprite.graphics.endFill();
    };
    p2DebugDraw.prototype.toWorldVector = function (v, b) {
        var out = new Array();
        p2.vec2.rotate(out, v, b.angle);
        return out;
    };
    p2DebugDraw.prototype.transformVec = function (v, offset, angle) {
        var nv = new Array();
        p2.vec2.rotate(nv, v, angle);
        p2.vec2.add(nv, nv, offset);
        return nv;
    };
    p2DebugDraw.prototype.drawDotLine = function (vertices, color, smoothly, segmentLength) {
        if (color === void 0) { color = 0; }
        if (smoothly === void 0) { smoothly = false; }
        if (segmentLength === void 0) { segmentLength = 30; }
        if (vertices.length < 2)
            return;
        var dotSize = 2 / this.factor;
        var firstPoint = [];
        p2.vec2.copy(firstPoint, vertices[0]);
        this.drawCircle(firstPoint, dotSize, color, 1, false);
        for (var i = 0; i < vertices.length - 2; i++) {
            var p = vertices[i];
            if (smoothly) {
                var distance = p2.vec2.distance(firstPoint, p);
                while (distance > (segmentLength / this.factor)) {
                    var distanceVector = [];
                    p2.vec2.subtract(distanceVector, p, firstPoint);
                    p2.vec2.scale(distanceVector, distanceVector, segmentLength / this.factor / distance);
                    p2.vec2.add(firstPoint, firstPoint, distanceVector);
                    this.drawCircle(firstPoint, dotSize, color, 1, false);
                    distance = p2.vec2.distance(firstPoint, p);
                }
            }
            else {
                this.drawCircle(p, dotSize, color, 1, false);
            }
        }
    };
    return p2DebugDraw;
}());
__reflect(p2DebugDraw.prototype, "p2DebugDraw");
//# sourceMappingURL=p2DebugDraw.js.map