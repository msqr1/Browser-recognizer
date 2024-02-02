#include "spkModel.h"
spkModel::spkModel(const std::string& storepath, const std::string& id, int index) : genericModel(storepath, id, index) {
  mdl = vosk_spk_model_new(".");
  if(mdl == nullptr) {
    throwJS("Unable to initialize speaker model");
  }
}
spkModel::~spkModel() {
  vosk_spk_model_free(mdl);
}
bool spkModel::checkModel() {
  return genericModel::checkModel();
}
void spkModel::afterFetch(int addr, size_t size) {
  genericModel::afterFetch(addr,size);
}
void spkModel::load(bool newThrd) {
  auto main{[this](){
    mdl = vosk_spk_model_new(".");
    if(mdl == nullptr) {
      fireEv("_continue", "Unable to load model for recognition", index);
      return;
    }
    fireEv("_continue", ".", index);
  }};
  if(!newThrd) {
    main();
    return;
  }
  // FIXME: Recognizer reuse this thread if possible
  std::thread t{main};
  t.detach();
}
bool spkModel::checkModelFiles() {
  return fs::exists("mfcc.conf", tank) && 
    fs::exists("final.ext.raw", tank) && 
    fs::exists("mean.vec", tank) && 
    fs::exists("transform.mat", tank);
}