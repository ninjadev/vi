varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;

#define EDGE_WIDTH 0.003
#define GLOW_WIDTH 0.007

vec3 sobel(sampler2D image) {
  vec4 color = texture2D(tDiffuse, vUv);
  vec4 up = texture2D(tDiffuse, vec2(vUv.x, vUv.y + EDGE_WIDTH));
  vec4 right = texture2D(tDiffuse, vec2(vUv.x + EDGE_WIDTH, vUv.y));
  float red = abs(color.r-right.r)+abs(color.r-up.r);
  float green = abs(color.g-right.g)+abs(color.g-up.g);
  float blue = abs(color.b-right.b)+abs(color.b-up.b);
  return vec3(red, red, red);
}

vec3 angle_glow(sampler2D tDepth) {
  float depth = texture2D(tDepth, vUv).r;
  float left = texture2D(tDepth, vec2(vUv.x - GLOW_WIDTH, vUv.y)).r;
  float right = texture2D(tDepth, vec2(vUv.x + GLOW_WIDTH, vUv.y)).r;
  float up = texture2D(tDepth, vec2(vUv.x, vUv.y - GLOW_WIDTH)).r;
  float down = texture2D(tDepth, vec2(vUv.x, vUv.y + GLOW_WIDTH)).r;

  if (depth < left && depth < right || depth < up && depth < down)
  {
    float strength = abs(depth - left) + abs(depth - right);
    return vec3(0.4, 0.086, 0.86) * strength * 100.;
  }
  else if (depth > left && depth > right || depth > up && depth > down)
  {
    float strength = abs(depth - left) + abs(depth - right);
    return vec3(0.98, 0.1, 0.) * strength * 100.;;
  }
  else
  {
    return vec3(0., 0., 0.);
  }
}

void main() {
  vec3 diffuse = texture2D(tDiffuse, vUv).rgb;
  float depth = texture2D(tDepth, vUv).x;



  //gl_FragColor.rgb = diffuse + sobel(tDiffuse);
  gl_FragColor.rgb = angle_glow(tDepth) + sobel(tDepth) * 0.8 + diffuse * 0.09;
  gl_FragColor.a = 1.0;
}