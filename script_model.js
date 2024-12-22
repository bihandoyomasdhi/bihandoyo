AFRAME.registerComponent('drag-rotate-zoom', {
    schema: {
      rotationSpeed: { type: 'number', default: 1 },
      zoomSpeed: { type: 'number', default: 0.1 },
      minScale: { type: 'number', default: 0.1 },
      maxScale: { type: 'number', default: 2 }
    },
    init: function () {
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
      this.rotation = this.el.object3D.rotation;
      this.scale = this.el.object3D.scale;

      // Event Listeners
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.onWheel = this.onWheel.bind(this);

      this.el.sceneEl.addEventListener('mousedown', this.onMouseDown);
      this.el.sceneEl.addEventListener('mousemove', this.onMouseMove);
      this.el.sceneEl.addEventListener('mouseup', this.onMouseUp);
      this.el.sceneEl.addEventListener('touchstart', this.onMouseDown);
      this.el.sceneEl.addEventListener('touchmove', this.onMouseMove);
      this.el.sceneEl.addEventListener('touchend', this.onMouseUp);
      this.el.sceneEl.addEventListener('wheel', this.onWheel);
    },
    onMouseDown: function (event) {
      this.isDragging = true;
      this.startX = event.touches ? event.touches[0].clientX : event.clientX;
      this.startY = event.touches ? event.touches[0].clientY : event.clientY;

      // Hentikan animasi rotasi
      this.el.removeAttribute('rotation-animation');
    },
    onMouseMove: function (event) {
      if (!this.isDragging) return;
      const currentX = event.touches ? event.touches[0].clientX : event.clientX;
      const currentY = event.touches ? event.touches[0].clientY : event.clientY;

      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      // Rotasi pada sumbu Y (horizontal) dan X (vertikal)
      this.rotation.y -= deltaX * this.data.rotationSpeed * 0.01;
      this.rotation.x += deltaY * this.data.rotationSpeed * 0.01;

      this.startX = currentX;
      this.startY = currentY;
    },
    onMouseUp: function () {
      this.isDragging = false;
      // Aktifkan kembali animasi rotasi setelah selesai drag
      this.el.setAttribute('rotation-animation', '');
    },
    onWheel: function (event) {
      const delta = event.deltaY * this.data.zoomSpeed * 0.001;
      const newScale = Math.max(
        this.data.minScale,
        Math.min(this.data.maxScale, this.scale.x - delta)
      );
      this.scale.set(newScale, newScale, newScale);
    }
  });

  // Komponen untuk animasi rotasi
  AFRAME.registerComponent('rotation-animation', {
    schema: {
      speed: { type: 'number', default: 0.02 }
    },
    tick: function () {
      if (this.el.getAttribute('rotation').y < 360) {
        this.el.object3D.rotation.y += this.data.speed;
      } else {
        this.el.object3D.rotation.y = 0; // Reset rotasi
      }
    }
  });