/* The double-power model is
*    p(r) = C * r^{-1}               for r <= b
*         = C * b^{γ-1} * r^{-γ}      for r > b
*
* with the normalization constant
*
*    C = 1 / ( Σ_{r=1}^{b} r^{-1} + b^{γ-1} Σ_{r=b+1}^{N} r^{-γ} ).
*/

/*

double-power な頻度で定まっている 1 音節語根の確率分布が p_甲(rank) [parameters: b_甲, γ_甲] で与えられる。
「1 音節語根だけで構成した真のコーパスが与えられたとき、そのコーパスから 1 音節語根を選んだときに、頻度 rank の語根が選ばれる」
という確率が p_甲(rank) である。


さて、それぞれの 1 音節語根にどの音節が割り当たるかが、これまた double-power な頻度で p_乙(rank) [parameters: b_乙, γ_乙] で与えられる。
「新規に出てきた語根に神が音節を割り当てたいとき、どの確率で頻度 rank の音節を割り当てるか」という確率が p_乙(rank) である。
この段階ではコーパスを見ないことに注意。




 */